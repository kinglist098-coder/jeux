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

export default async function handler(req, res) {
  const path = req.url.replace('/api', '');
  const method = req.method;

  try {
    // AUTH ROUTES
    if (path === '/auth/signup' && method === 'POST') {
      const { email, password, firstName, lastName } = req.body;
      
      const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1);
      
      if (existing && existing.length > 0) {
        return res.status(400).json({ error: "Cet email est déjà utilisé." });
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
      
      return res.status(200).json({ token, user: { email, firstName, lastName, isAdmin } });
    }

    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = req.body;
      
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (!users || users.length === 0) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect." });
      }

      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        return res.status(401).json({ error: "Email ou mot de passe incorrect." });
      }

      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
      
      return res.status(200).json({ 
        token, 
        user: { email: user.email, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin } 
      });
    }

    // PRODUCT ROUTES
    if (path === '/products' && method === 'GET') {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      let filtered = products || [];
      const { category, minPrice, maxPrice, q } = req.query;
      
      if (category) filtered = filtered.filter(p => p.category === category);
      if (minPrice) filtered = filtered.filter(p => p.priceHT * 1.2 >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.priceHT * 1.2 <= Number(maxPrice));
      if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

      return res.status(200).json(filtered);
    }

    if (path.startsWith('/products/') && method === 'GET') {
      const id = path.split('/')[2];
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !product) {
        return res.status(404).json({ error: "Produit non trouvé" });
      }

      return res.status(200).json(product);
    }

    // ORDER ROUTES
    if (path === '/orders' && method === 'POST') {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Non autorisé" });
      
      const token = authHeader.split(" ")[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) return res.status(401).json({ error: "Non autorisé" });

      const { items, totalTTC } = req.body;
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

      return res.status(200).json(order);
    }

    if (path === '/orders/me' && method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Non autorisé" });
      
      const token = authHeader.split(" ")[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) return res.status(401).json({ error: "Non autorisé" });

      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return res.status(200).json(orders || []);
    }

    // ADMIN ROUTES
    if (path === '/admin/orders' && method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(403).json({ error: "Accès refusé" });
      
      const token = authHeader.split(" ")[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user || user.email !== ADMIN_EMAIL) {
        return res.status(403).json({ error: "Accès refusé" });
      }

      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return res.status(200).json(orders || []);
    }

    if (path.startsWith('/admin/orders/') && method === 'PATCH') {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(403).json({ error: "Accès refusé" });
      
      const token = authHeader.split(" ")[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user || user.email !== ADMIN_EMAIL) {
        return res.status(403).json({ error: "Accès refusé" });
      }

      const orderId = path.split('/')[3];
      const { status } = req.body;

      const { data: order, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json(order);
    }

    return res.status(404).json({ error: "Route non trouvée" });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
