-- Table des utilisateurs pour Netlify Functions / Vercel Serverless
-- À exécuter dans l'éditeur SQL de Supabase

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  firstName TEXT,
  lastName TEXT,
  isAdmin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index sur email pour les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir leurs propres données
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent créer leur propre compte
CREATE POLICY "Users can create own account"
  ON users
  FOR INSERT
  WITH CHECK (true);

-- Politique : Les utilisateurs peuvent modifier leurs propres données
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);
