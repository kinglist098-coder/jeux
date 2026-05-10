# Guide de Déploiement Netlify

## 📋 Prérequis

1. Compte Netlify (gratuit)
2. Backend Express.js déployé (Railway, Render, ou Heroku)
3. Projet connecté à Git (GitHub, GitLab, ou Bitbucket)

---

## 🚀 Étapes de Déploiement

### 1️⃣ Préparer le Backend (AVANT Netlify)

Votre backend Express.js (`server.ts`) doit être déployé sur une plateforme qui supporte Node.js :

**Options recommandées :**
- **Railway** (recommandé) : https://railway.app
- **Render** : https://render.com
- **Heroku** : https://heroku.com

**Variables d'environnement pour le backend :**
```env
SUPABASE_URL=https://embpofaaxqathjtaumax.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
RESEND_API_KEY=re_WPUcfHk3_9i8uk2Pgk9hVAf9DhxuejxE9
ADMIN_EMAIL=askipas62@gmail.com
JWT_SECRET=votre_secret_jwt_tres_securise
NODE_ENV=production
```

### 2️⃣ Configurer netlify.toml

Modifiez `netlify.toml` et remplacez `YOUR_BACKEND_URL.com` par l'URL de votre backend déployé :

```toml
[[redirects]]
  from = "/api/*"
  to = "https://votre-backend.railway.app/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/uploads/*"
  to = "https://votre-backend.railway.app/uploads/:splat"
  status = 200
  force = true
```

### 3️⃣ Déployer sur Netlify

#### Option A : Via Netlify CLI (Recommandé)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser le site
netlify init

# Déployer
netlify deploy --prod
```

#### Option B : Via Interface Web

1. Allez sur https://app.netlify.com
2. Cliquez sur "Add new site" > "Import an existing project"
3. Connectez votre repository Git
4. Configurez :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Ajoutez les variables d'environnement (voir section ci-dessous)
6. Cliquez sur "Deploy site"

#### Option C : Drag & Drop (Simple)

```bash
# Build le projet
npm run build

# Glissez le dossier "dist" sur https://app.netlify.com/drop
```

### 4️⃣ Configurer les Variables d'Environnement sur Netlify

Dans le dashboard Netlify :
1. Allez dans **Site settings** > **Environment variables**
2. Ajoutez :

```
VITE_SUPABASE_URL=https://embpofaaxqathjtaumax.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_nix_vB-EnRbYPW2yKz4M0g_ZNrpqXhg
VITE_ADMIN_EMAIL=askipas62@gmail.com
```

⚠️ **Important** : Ne mettez PAS `SUPABASE_SERVICE_ROLE_KEY` ou `RESEND_API_KEY` sur Netlify (ce sont des secrets backend).

### 5️⃣ Configurer un Domaine Personnalisé (Optionnel)

1. Allez dans **Domain settings** > **Add custom domain**
2. Ajoutez votre domaine (ex: `appiotti.com`)
3. Configurez les DNS selon les instructions de Netlify
4. Activez HTTPS (automatique avec Let's Encrypt)

---

## 🔧 Structure du Projet après Déploiement

```
Frontend (Netlify)          Backend (Railway/Render)
├── appiotti.netlify.app    ├── votre-backend.railway.app
├── /api/* → redirect       ├── /api/auth/*
├── /uploads/* → redirect   ├── /api/products/*
└── Static files            ├── /api/orders/*
                            └── /uploads/*
```

---

## ✅ Vérification Post-Déploiement

Testez ces fonctionnalités :

1. **Page d'accueil** : `https://votre-site.netlify.app`
2. **Inscription/Connexion** : Vérifiez Supabase Auth
3. **Catalogue produits** : Vérifiez les appels API
4. **Création de commande** : Vérifiez les redirects vers backend
5. **Upload preuve** : Vérifiez le multipart/form-data
6. **Emails Resend** : Vérifiez que `zakaz@forumles.ru` reçoit les notifications

---

## 🐛 Résolution de Problèmes

### Les appels API échouent (404)
- Vérifiez que `YOUR_BACKEND_URL.com` dans `netlify.toml` est correct
- Vérifiez les logs Netlify : **Deploys** > **Deploy log**

### Erreur CORS
- Ajoutez l'URL Netlify dans les origins autorisées du backend :
```typescript
app.use(cors({
  origin: ['https://votre-site.netlify.app', 'http://localhost:3000']
}));
```

### Les uploads ne fonctionnent pas
- Vérifiez que le backend accepte `multipart/form-data`
- Vérifiez que le redirect `/uploads/*` dans `netlify.toml` pointe vers le bon URL

### Variables d'environnement non détectées
- Redéployez après avoir ajouté les variables
- Vérifiez le préfixe `VITE_` pour les variables client

---

## 🔄 Déploiements Automatiques (CI/CD)

Netlify déploie automatiquement à chaque push sur la branche principale.

Pour configurer :
1. **Site settings** > **Build & deploy** > **Continuous Deployment**
2. Sélectionnez votre branche (ex: `main` ou `master`)
3. Configurez les déploiements preview pour les pull requests

---

## 💰 Coûts

**Netlify (Gratuit) :**
- 100GB bandwidth/mois
- 300 minutes de build/mois
- Sites illimités

**Backend (Railway - ~$5/mois) :**
- 500 heures d'exécution/mois
- 512MB RAM
- 1GB stockage

---

## 📝 Checklist Finale

- [ ] Backend déployé et fonctionnel
- [ ] `netlify.toml` configuré avec l'URL du backend
- [ ] Variables d'environnement ajoutées sur Netlify
- [ ] Build réussi (`npm run build`)
- [ ] Site déployé et accessible
- [ ] Authentification Supabase fonctionnelle
- [ ] Appels API vers backend fonctionnent
- [ ] Upload de fichiers fonctionne
- [ ] Emails Resend envoyés à `zakaz@forumles.ru`
- [ ] HTTPS activé
- [ ] Domaine personnalisé configuré (optionnel)

---

## 📞 Support

- Documentation Netlify : https://docs.netlify.com
- Support Supabase : https://supabase.com/docs
- Support Resend : https://resend.com/docs
