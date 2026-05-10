# 🚀 Guide Rapide - Déploiement 100% Gratuit (Netlify/Vercel)

## ⚡ En 5 Minutes - Déploiement GRATUIT

### 🎯 Architecture 100% Gratuite

```
┌──────────────────────────────────────┐
│   NETLIFY ou VERCEL (Tout-en-un)    │
│                                      │
│  Frontend (React Static)            │
│  + Backend (Serverless Functions)   │
│  + API Routes                       │
│  + Email Notifications              │
└──────────────┬───────────────────────┘
               │
               │ Requêtes
               │
┌──────────────▼───────────────────────┐
│       SERVICES EXTERNES              │
│  • Supabase (Auth + DB) - GRATUIT   │
│  • Resend (Emails) - GRATUIT        │
└──────────────────────────────────────┘
```

**Coût total : $0/mois** 🎉

---

## 📋 Prérequis

1. Compte Netlify ou Vercel (gratuit)
2. Compte Supabase (gratuit)
3. Compte Resend (gratuit)
4. Projet sur GitHub/GitLab/Bitbucket

---

## 🚀 OPTION 1 : Déploiement sur Netlify (Recommandé)

### Étape 1 : Installer Netlify CLI
```bash
npm install -g netlify-cli
```

### Étape 2 : Configurer les Variables d'Environnement

**Sur Netlify Dashboard :**
1. Allez dans **Site settings** > **Environment variables**
2. Ajoutez ces variables :

```
# Backend (Server-side)
SUPABASE_URL=https://embpofaaxqathjtaumax.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
RESEND_API_KEY=re_WPUcfHk3_9i8uk2Pgk9hVAf9DhxuejxE9
ADMIN_EMAIL=askipas62@gmail.com
JWT_SECRET=un_secret_aleatoire_tres_securise

# Frontend (Client-side)
VITE_SUPABASE_URL=https://embpofaaxqathjtaumax.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key
VITE_ADMIN_EMAIL=askipas62@gmail.com
```

### Étape 3 : Déployer

**Méthode 1 - CLI (Recommandé) :**
```bash
netlify login
npm run build:deploy
```

**Méthode 2 - Interface Web :**
1. Allez sur https://app.netlify.com
2. "Add new site" > "Import an existing project"
3. Connectez votre repository
4. Configurez :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Cliquez sur "Deploy site"

### Étape 4 : Vérifier

✅ Site : `https://votre-site.netlify.app`
✅ API : `https://votre-site.netlify.app/api/products`

---

## 🚀 OPTION 2 : Déploiement sur Vercel

### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2 : Configurer les Variables d'Environnement

**Sur Vercel Dashboard :**
1. Allez dans **Project settings** > **Environment Variables**
2. Ajoutez les mêmes variables que Netlify (voir ci-dessus)

### Étape 3 : Déployer

**Méthode 1 - CLI :**
```bash
vercel login
vercel --prod
```

**Méthode 2 - Interface Web :**
1. Allez sur https://vercel.com
2. "Add New..." > "Project"
3. Importez votre repository
4. Vercel détecte automatiquement `vercel.json`
5. Cliquez sur "Deploy"

### Étape 4 : Vérifier

✅ Site : `https://votre-site.vercel.app`
✅ API : `https://votre-site.vercel.app/api/products`

---

## ✅ Checklist de Vérification

Après déploiement, testez :

- [ ] Page d'accueil charge correctement
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Catalogue produits s'affiche (`/api/products`)
- [ ] Ajout au panier fonctionne
- [ ] Création de commande réussie
- [ ] Dashboard admin accessible
- [ ] Dashboard client accessible

---

## 🆚 Netlify vs Vercel - Comparaison

| Fonctionnalité | Netlify | Vercel |
|----------------|---------|--------|
| **Prix** | GRATUIT | GRATUIT |
| **Functions/mois** | 125K | 100K |
| **Bandwidth** | 100GB | 100GB |
| **Build minutes** | 300/min | 6000/min |
| **Déploiement auto** | ✅ | ✅ |
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Recommandation** : Les deux sont excellents. Choisissez celui que vous préférez !

---

## 🐛 Dépannage

### Les appels API retournent 404 ou 500
**Solution :**
1. Vérifiez que les variables d'environnement sont configurées
2. Vérifiez les logs :
   - Netlify : **Functions** > **Logs**
   - Vercel : **Functions** > **View logs**

### Erreur Supabase
**Solution :**
- Vérifiez `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`
- Assurez-vous que la base de données est accessible

### Emails Resend non reçus
**Solution :**
1. Vérifiez `RESEND_API_KEY`
2. En mode sandbox, `zakaz@forumles.ru` doit être vérifié sur Resend
3. Vérifiez les logs de la fonction serverless

### Build échoue
**Solution :**
```bash
# Testez en local d'abord
npm run build
# Si ça marche, déployez
```

---

## 💰 Coût : 100% GRATUIT ! 🎉

| Service | Plan | Coût |
|---------|------|------|
| **Netlify/Vercel** | Free Tier | $0/mois |
| **Supabase** | Free Tier | $0/mois |
| **Resend** | Free Tier | $0/mois |
| **TOTAL** | | **$0/mois** |

### Limits du Free Tier
- **Netlify** : 125K functions invocations/mois
- **Supabase** : 500MB DB, 1GB storage, 50K users
- **Resend** : 3,000 emails/mois, 100 emails/jour

**Suffisant pour une boutique en ligne !** ✅

---

## 📚 Fichiers de Configuration

### Pour Netlify
- `netlify.toml` - Configuration principale
- `netlify/functions/api.js` - Backend serverless

### Pour Vercel
- `vercel.json` - Configuration principale
- `api/index.js` - Backend serverless

---

## 🎉 Prochaines Étapes

1. **Choisissez** Netlify ou Vercel
2. **Configurez** les variables d'environnement
3. **Déployez** avec la CLI ou l'interface web
4. **Testez** toutes les fonctionnalités
5. **Configurez un domaine personnalisé** (optionnel, gratuit)

---

## 📞 Besoin d'Aide ?

- **Documentation Netlify** : https://docs.netlify.com
- **Documentation Vercel** : https://vercel.com/docs
- **Documentation Supabase** : https://supabase.com/docs
- **Documentation Resend** : https://resend.com/docs

---

**🚀 Prêt à déployer ? C'est 100% GRATUIT !**

Commencez maintenant : `npm run build:deploy`
