# 🚀 Déploiement Appiotti Game Shop

Ce projet est maintenant **prêt pour le déploiement sur Netlify** !

## 📚 Documentation de Déploiement

Consultez ces fichiers selon vos besoins :

| Fichier | Description |
|---------|-------------|
| **[DEPLOY_RAPIDE.md](./DEPLOY_RAPIDE.md)** | ⚡ Guide express en 5 minutes |
| **[CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)** | ✅ Checklist complète étape par étape |
| **[NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)** | 📖 Guide détaillé avec troubleshooting |

---

## 🎯 Architecture du Projet

```
Frontend (Netlify)          Backend (Railway/Render)
├── React + TypeScript      ├── Express.js
├── Tailwind CSS            ├── Supabase Integration
├── Vite Build              ├── Resend Emails
└── Static Files            └── File Uploads
```

---

## ⚡ Déploiement Rapide

### 1. Installer Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Déployer le Backend (Railway)
- Déployez sur https://railway.app
- Ajoutez les variables d'environnement
- Copiez l'URL du backend

### 3. Configurer netlify.toml
Remplacez `YOUR_BACKEND_URL.com` par votre URL backend dans `netlify.toml`

### 4. Déployer le Frontend
```bash
netlify login
npm run build:deploy
```

### 5. Ajouter les Variables Netlify
```
VITE_SUPABASE_URL=https://embpofaaxqathjtaumax.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_EMAIL=askipas62@gmail.com
```

---

## 📦 Fichiers de Configuration Créés

- ✅ `netlify.toml` - Configuration Netlify
- ✅ `railway.json` - Configuration Railway
- ✅ `deploy.sh` - Script Linux/Mac
- ✅ `deploy.ps1` - Script Windows
- ✅ `.env.netlify` - Template variables Netlify

---

## 🎉 Commandes de Déploiement

```bash
# Build seulement
npm run build

# Déploiement production
npm run deploy:netlify

# Build + Deploy
npm run build:deploy

# Script interactif (Linux/Mac)
./deploy.sh

# Script interactif (Windows)
.\deploy.ps1
```

---

## 📋 Checklist Rapide

- [ ] Backend déployé sur Railway/Render
- [ ] URL backend dans `netlify.toml`
- [ ] Netlify CLI installé
- [ ] Site déployé sur Netlify
- [ ] Variables d'environnement configurées
- [ ] Site testé et fonctionnel
- [ ] Emails Resend fonctionnels (`zakaz@forumles.ru`)

---

## 💰 Coûts

- **Netlify** : Gratuit (100GB bandwidth)
- **Railway** : ~$5/mois
- **Supabase** : Gratuit (500MB DB)
- **Resend** : Gratuit (3K emails/mois)

**Total : ~$5/mois**

---

## 🐛 Support

**Problèmes fréquents :**
- API 404 → Vérifiez `netlify.toml`
- Erreur CORS → Backend accepte déjà `.netlify.app`
- Emails non reçus → Vérifiez Resend dashboard

Voir `NETLIFY_DEPLOY.md` pour plus de détails.

---

## 📞 Ressources

- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)

---

**Prêt à déployer ? Commencez par [DEPLOY_RAPIDE.md](./DEPLOY_RAPIDE.md) ! 🚀**
