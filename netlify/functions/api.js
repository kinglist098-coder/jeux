import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_in_production";
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "askipas62@gmail.com";
const NOTIFICATION_EMAIL = "zakaz@forumles.ru";

// Helper functions
const getAuthUser = async (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  if (!token || !supabase) return null;
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;
    
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.email === ADMIN_EMAIL,
      metadata: user.user_metadata
    };
  } catch (e) {
    return null;
  }
};

const sendOrderEmail = async (order, user) => {
  if (!resend) return;
  
  try {
    const clientName = `${user.metadata?.firstName || ""} ${user.metadata?.lastName || ""}`.trim() || user.email || "Client inconnu";
    const appUrl = process.env.URL || 'https://appiotti.netlify.app';

    await resend.emails.send({
      from: 'Appiotti Game Shop <onboarding@resend.dev>',
      to: NOTIFICATION_EMAIL,
      subject: `🆕 Nouvelle commande - ${order.id}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #ff6b35;">Nouvelle commande reçue !</h1>
          <p>Le client <strong>${clientName}</strong> (${user.email}) vient de passer une commande.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Détails de la commande</h3>
            <p><strong>Référence :</strong> ${order.id}</p>
            <p><strong>Montant Total :</strong> ${order.totalTTC.toLocaleString()} € TTC</p>
            <p><strong>Status :</strong> En attente de virement</p>
          </div>
          <a href="${appUrl}/admin/dashboard" 
             style="display: inline-block; background: #1B1B2F; color: white; padding: 12px 25px; border-radius: 12px; text-decoration: none; font-weight: bold;">
            Voir dans le Dashboard
          </a>
        </div>
      `
    });
  } catch (err) {
    console.error("Resend Order Notification Error:", err);
  }
};

const sendProofEmail = async (order, user) => {
  if (!resend) return;
  
  try {
    const clientName = `${user.metadata?.firstName || ""} ${user.metadata?.lastName || ""}`.trim() || user.email || "Client inconnu";
    const appUrl = process.env.URL || 'https://appiotti.netlify.app';

    await resend.emails.send({
      from: 'Appiotti Game Shop <onboarding@resend.dev>',
      to: NOTIFICATION_EMAIL,
      subject: `📦 Nouvelle preuve de paiement - Commande ${order.id}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #f97316;">Nouvelle preuve de paiement reçue</h1>
          <p>Le client <strong>${clientName}</strong> (${user.email}) vient de téléverser une preuve de paiement.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Détails de la commande</h3>
            <p><strong>Référence :</strong> ${order.id}</p>
            <p><strong>Montant Total :</strong> ${order.totalTTC.toLocaleString()} € TTC</p>
            <p><strong>Date :</strong> ${new Date(order.createdAt).toLocaleString('fr-FR')}</p>
          </div>
          <a href="${appUrl}/admin/dashboard" 
             style="display: inline-block; background: #1B1B2F; color: white; padding: 12px 25px; border-radius: 12px; text-decoration: none; font-weight: bold;">
            Accéder au Dashboard
          </a>
        </div>
      `
    });
  } catch (err) {
    console.error("Resend Proof Notification Error:", err);
  }
};

// Main handler
export default async function handler(event, context) {
  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;

  try {
    // AUTH ROUTES
    if (path === '/auth/signup' && method === 'POST') {
      const { email, password, firstName, lastName } = JSON.parse(event.body);
      
      const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1);
      
      if (existing && existing.length > 0) {
        return { statusCode: 400, body: JSON.stringify({ error: "Cet email est déjà utilisé." }) };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const isAdmin = email === ADMIN_EMAIL;

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword, firstName, lastName, isAdmin }])
        .select()
        .single();

      if (insertError) throw insertError;

      const token = jwt.sign({ userId: newUser.id, isAdmin }, JWT_SECRET, { expiresIn: '7d' });
      
      return {
        statusCode: 200,
        body: JSON.stringify({ token, user: { email, firstName, lastName, isAdmin } })
      };
    }

    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = JSON.parse(event.body);
      
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (!users || users.length === 0) {
        return { statusCode: 401, body: JSON.stringify({ error: "Email ou mot de passe incorrect." }) };
      }

      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        return { statusCode: 401, body: JSON.stringify({ error: "Email ou mot de passe incorrect." }) };
      }

      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          token, 
          user: { email: user.email, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin } 
        })
      };
    }

    // PRODUCT ROUTES
    if (path === '/products' && method === 'GET') {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      let filtered = products || [];
      const params = event.queryStringParameters || {};
      
      if (params.category) filtered = filtered.filter(p => p.category === params.category);
      if (params.minPrice) filtered = filtered.filter(p => p.priceHT * 1.2 >= Number(params.minPrice));
      if (params.maxPrice) filtered = filtered.filter(p => p.priceHT * 1.2 <= Number(params.maxPrice));
      if (params.q) filtered = filtered.filter(p => p.name.toLowerCase().includes(params.q.toLowerCase()));

      return { statusCode: 200, body: JSON.stringify(filtered) };
    }

    if (path.startsWith('/products/') && method === 'GET') {
      const id = path.split('/')[2];
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !product) {
        return { statusCode: 404, body: JSON.stringify({ error: "Produit non trouvé" }) };
      }

      return { statusCode: 200, body: JSON.stringify(product) };
    }

    // ORDER ROUTES
    if (path === '/orders' && method === 'POST') {
      const user = await getAuthUser(event);
      if (!user) return { statusCode: 401, body: JSON.stringify({ error: "Non autorisé" }) };

      const { items, totalTTC } = JSON.parse(event.body);
      const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

      const newOrder = {
        id: orderId,
        user_id: user.id,
        items: JSON.stringify(items),
        total_ttc: totalTTC,
        status: "En attente de virement",
        proof_uploaded: false
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single();

      if (error) throw error;

      // Send email notification
      await sendOrderEmail(order, user);

      return { statusCode: 200, body: JSON.stringify(order) };
    }

    if (path === '/orders/me' && method === 'GET') {
      const user = await getAuthUser(event);
      if (!user) return { statusCode: 401, body: JSON.stringify({ error: "Non autorisé" }) };

      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { statusCode: 200, body: JSON.stringify(orders || []) };
    }

    // ADMIN ROUTES
    if (path === '/admin/orders' && method === 'GET') {
      const user = await getAuthUser(event);
      if (!user || !user.isAdmin) {
        return { statusCode: 403, body: JSON.stringify({ error: "Accès refusé" }) };
      }

      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { statusCode: 200, body: JSON.stringify(orders || []) };
    }

    if (path.startsWith('/admin/orders/') && method === 'PATCH') {
      const user = await getAuthUser(event);
      if (!user || !user.isAdmin) {
        return { statusCode: 403, body: JSON.stringify({ error: "Accès refusé" }) };
      }

      const orderId = path.split('/')[3];
      const { status } = JSON.parse(event.body);

      const { data: order, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      return { statusCode: 200, body: JSON.stringify(order) };
    }

    return { statusCode: 404, body: JSON.stringify({ error: "Route non trouvée" }) };

  } catch (error) {
    console.error('Error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Erreur serveur", details: error.message }) 
    };
  }
}
