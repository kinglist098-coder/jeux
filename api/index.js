import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Busboy from 'busboy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

const readDB = (file) => JSON.parse(fs.readFileSync(file, 'utf-8') || '[]');

// Helper pour parser les fichiers multipart/form-data
const parseMultipartForm = (req) => {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const fields = {};
    let fileData = null;
    let fileName = null;
    let mimeType = null;

    busboy.on('field', (fieldname, val) => {
      fields[fieldname] = val;
    });

    busboy.on('file', (fieldname, file, info) => {
      const chunks = [];
      fileName = info.filename;
      mimeType = info.mimeType;
      
      file.on('data', (chunk) => {
        chunks.push(chunk);
      });

      file.on('end', () => {
        fileData = Buffer.concat(chunks);
      });
    });

    busboy.on('finish', () => {
      resolve({ fields, file: fileData, fileName, mimeType });
    });

    busboy.on('error', (err) => {
      reject(err);
    });

    if (req.body) {
      busboy.end(req.body);
    } else {
      req.on('data', (chunk) => {
        busboy.write(chunk);
      });
      req.on('end', () => {
        busboy.end();
      });
    }
  });
};

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
      let products = readDB(PRODUCTS_FILE);
      const { category, minPrice, maxPrice, q } = req.query;
      
      if (category) products = products.filter(p => p.category === category);
      if (minPrice) products = products.filter(p => p.priceHT * 1.2 >= Number(minPrice));
      if (maxPrice) products = products.filter(p => p.priceHT * 1.2 <= Number(maxPrice));
      if (q) products = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

      return res.status(200).json(products);
    }

    if (path.startsWith('/products/') && method === 'GET') {
      const id = path.split('/')[2];
      const products = readDB(PRODUCTS_FILE);
      const product = products.find(p => p.id === id);

      if (!product) {
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

    if (path.startsWith('/orders/') && path.endsWith('/proof') && method === 'POST') {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Non autorisé" });
      
      const token = authHeader.split(" ")[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) return res.status(401).json({ error: "Non autorisé" });

      const orderId = path.split('/')[2];
      
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (fetchError || !order) {
        return res.status(404).json({ error: "Commande non trouvée" });
      }

      // Parser le fichier uploadé
      let proofBuffer = null;
      let proofFilename = null;
      let proofMimeType = null;

      try {
        const parsed = await parseMultipartForm(req);
        if (parsed.file) {
          proofBuffer = parsed.file;
          proofFilename = parsed.fileName || 'proof.jpg';
          proofMimeType = parsed.mimeType || 'image/jpeg';
        }
      } catch (err) {
        console.error('Error parsing multipart:', err);
      }

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: "En cours de validation",
          proof_uploaded: true
        })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // Send Email to Admin via Resend with attachment
      if (resend) {
        try {
          const clientName = `${user.user_metadata?.firstName || ''} ${user.user_metadata?.lastName || ''}`.trim() || user.email || "Client inconnu";
          const appUrl = process.env.URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

          const emailData = {
            from: 'Appiotti Game Shop <onboarding@resend.dev>',
            to: NOTIFICATION_EMAIL,
            subject: `📦 Nouvelle preuve de paiement - Commande ${orderId}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #f97316;">Nouvelle preuve de paiement reçue</h1>
                <p>Le client <strong>${clientName}</strong> (${user.email}) vient de téléverser une preuve de paiement pour sa commande.</p>
                
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Détails de la commande</h3>
                  <p><strong>Référence :</strong> ${orderId}</p>
                  <p><strong>Montant Total :</strong> ${order.total_ttc ? order.total_ttc.toLocaleString() : 'N/A'} € TTC</p>
                  <p><strong>Date :</strong> ${new Date(order.created_at).toLocaleString('fr-FR')}</p>
                </div>

                <p>Vous trouverez la preuve de paiement en pièce jointe de cet email.</p>
                <p>Vous pouvez consulter et valider la commande depuis votre tableau de bord administrateur.</p>
                <a href="${appUrl}/admin/dashboard" 
                   style="display: inline-block; background: #1B1B2F; color: white; padding: 12px 25px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px;">
                  Accéder au Dashboard
                </a>
              </div>
            `,
            attachments: []
          };

          // Ajouter le fichier en pièce jointe si présent
          if (proofBuffer) {
            emailData.attachments = [
              {
                filename: proofFilename,
                content: proofBuffer,
                contentType: proofMimeType
              }
            ];
          }

          await resend.emails.send(emailData);
        } catch (mailErr) {
          console.error("Resend Proof Notification Error:", mailErr);
        }
      }

      return res.status(200).json({ 
        id: orderId,
        status: "En cours de validation",
        proofUploaded: true
      });
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
