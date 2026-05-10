# 📖 DOCUMENTATION - APPIOTTI GAME SHOP

## 🎯 Qu'est-ce qu'Appiotti Game Shop?

**Appiotti Game Shop** est une boutique en ligne complète dédiée aux jeux et loisirs estivaux.

Fondée par **Hervé Appiotti** (basée à Saint-Sornin, Charente), elle propose:
- Baby-foot (6 produits)
- Tennis de table / Ping-pong (6 produits)
- Billard (6 produits)
- Trampolines (6 produits)
- Accessoires gaming (6 produits)
- Consoles de jeux (6 produits)

**Total**: 36 produits premium + service client personnalisé

---

## 📚 DOCUMENTATION DISPONIBLE

### 1️⃣ [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md) - Vue d'ensemble complète

**Contenu:**
- Architecture globale (Frontend, Backend, Database)
- Vue des fichiers du projet
- Pages et composants détaillés
- Contextes et gestion d'état
- Services et API
- Routes backend complètes
- Données et persistance
- Design et styling
- Flux données principales
- Sécurité et authentification
- Résumé du projet

**Pour qui?** Quelqu'un qui veut comprendre la structure globale

**Quand lire?** Première approche du projet

---

### 2️⃣ [FLUX_DETAILLES.md](./FLUX_DETAILLES.md) - Logique métier détaillée

**Contenu:**
- Flux d'authentification (Signup, Login, Logout, Forgot Password)
- Flux panier et achat
- Flux paiement par virement (4 étapes)
- Flux admin et validation
- Flux wishlist/favoris
- Gestion des erreurs
- Scénarios edge cases

**Pour qui?** Développeur qui veut tracer le chemin d'une action

**Quand lire?** Pour comprendre comment fonctionne un processus spécifique

---

### 3️⃣ [INDEX_FICHIERS.md](./INDEX_FICHIERS.md) - Index rapide des fichiers

**Contenu:**
- Liste tous les fichiers clés avec lignes et descriptions
- Table par catégorie (config, server, contextes, pages, composants)
- Points d'intégration clés
- Workflow authentification
- Workflow virement
- Flux d'intégration (Frontend→Backend→Database)
- Quick search par fonction
- Métriques du projet
- Checklist déploiement

**Pour qui?** Quand on cherche un fichier spécifique

**Quand lire?** Comme référence rapide (index)

---

### 4️⃣ [GUIDE_VISUEL.md](./GUIDE_VISUEL.md) - Guide UI/UX

**Contenu:**
- Structure visuelle ASCII des pages
- Home page layout détaillé
- Shop page layout détaillé
- Cart page layout détaillé
- Payment page layout détaillé
- Admin dashboard layout détaillé
- Palette de couleurs
- Typographie Tailwind
- Patterns de composants (buttons, cards, animations)
- Commandes utiles (dev, build, debug)
- API calls exemples

**Pour qui?** Designer ou dev frontend

**Quand lire?** Pour référencer le design d'une page

---

### 5️⃣ [TECH_STACK.md](./TECH_STACK.md) - Stack technologique

**Contenu:**
- Résumé stack global
- Toutes les dépendances npm (23 prod + 11 dev)
- Détail chaque library majeure
- Configuration clés (tsconfig, vite.config, package.json)
- Variables d'environnement
- Version matrix
- Sécurité
- Performance
- Updates & compatibility
- Setup testing (recommandé)
- Ressources essentielles
- Tech decisions rationale
- Technical debt & TODOs
- Deployment checklist

**Pour qui?** Développeur backend ou ops

**Quand lire?** Quand tu dois configurer, deployer ou ajouter une dépendance

---

## 🗂️ STRUCTURE DE FICHIERS

```
appiotti-game-shop/
├── 📖 DOCUMENTATION (fichiers .md)
│   ├── ARCHITECTURE_COMPLETE.md     ← Vue d'ensemble
│   ├── FLUX_DETAILLES.md           ← Logique métier
│   ├── INDEX_FICHIERS.md           ← Index rapide
│   ├── GUIDE_VISUEL.md             ← UI/UX
│   └── TECH_STACK.md               ← Stack technique
│
├── 📦 CODE SOURCE
│   ├── src/
│   │   ├── App.tsx                 ← Router principal
│   │   ├── main.tsx                ← Entry point React
│   │   ├── index.css               ← Styles globals
│   │   ├── components/             ← UI réutilisables
│   │   ├── context/                ← State global (Auth, Cart, Wishlist)
│   │   ├── pages/                  ← 13 pages du site
│   │   ├── lib/                    ← Supabase client
│   │   └── services/               ← Wrappers API Supabase
│   │
│   ├── server.ts                   ← Express backend (368 lignes)
│   ├── package.json                ← Dépendances npm
│   ├── tsconfig.json               ← Config TypeScript
│   ├── vite.config.ts              ← Config Vite
│   ├── index.html                  ← HTML entry point
│   │
│   ├── data/                        ← JSON database (fallback)
│   │   ├── users.json
│   │   ├── products.json
│   │   └── orders.json
│   │
│   ├── public/                      ← Assets statiques
│   │   ├── images/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   └── hero-bg.jpg
│   │   └── uploads/
│   │       └── proofs/              ← Uploads preuves virement
│   │
│   ├── dist/                        ← Build production (après npm run build)
│   ├── node_modules/                ← Dépendances npm
│   └── README.md                    ← Original README
```

---

## 🚀 QUICK START

### Installation
```bash
cd appiotti-game-shop
npm install
```

### Configuration
```bash
# Créer .env.local
cat > .env.local << EOF
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
JWT_SECRET=super_secret_key_min_32_chars
ADMIN_EMAIL=askipas62@gmail.com
RESEND_API_KEY=re_xxxxxxxx
APP_URL=http://localhost:3000
NODE_ENV=development
EOF
```

### Démarrage
```bash
npm run dev
# Server runs on http://localhost:3000
# Vite HMR: Automatic reload on changes
```

### Build
```bash
npm run build          # Vite optimized build
npm run preview        # Test build locally
npm run clean          # Remove dist/
npm run lint           # Check TypeScript
```

---

## 📖 READING GUIDE PAR PROFIL

### Je suis Frontend Developer
1. Lis [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md) - Vue d'ensemble
2. Lis [GUIDE_VISUEL.md](./GUIDE_VISUEL.md) - Pages & componants
3. Lis [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-panier--achat) - Flux panier/achat
4. Explore `src/components/`, `src/pages/`, `src/context/`

### Je suis Backend Developer
1. Lis [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md) - Vue d'ensemble
2. Lis [TECH_STACK.md](./TECH_STACK.md) - Dépendances & config
3. Lis [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-paiement-virement) - Flux paiement
4. Explore `server.ts` directement

### Je dois déployer en production
1. Lis [TECH_STACK.md](./TECH_STACK.md#-deployment-checklist) - Checklist déploiement
2. Lis [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-environnement-envlocal) - Env vars
3. Prepare: Node 18+, Supabase, Resend API key

### Je dois ajouter une feature
1. Lis [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-je-cherche-le-code-pour) - Cherche fichier relevé
2. Lis [FLUX_DETAILLES.md](./FLUX_DETAILLES.md) - Comprends le flux actuel
3. Identifie les points d'intégration (Frontend/Backend/DB)

### Je dois faire du debugging
1. Lis [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#gestion-erreurs) - Gestion erreurs
2. Lis [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#debugging) - Commandes debug
3. Check console logs + Network tab (DevTools)

### Je dois comprendre la sécurité
1. Lis [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-sécurité--authentification) - Auth
2. Lis [TECH_STACK.md](./TECH_STACK.md#-sécurité) - Passwords, JWT, Files

---

## 🎯 POINTS CLÉS À RETENIR

### Architecture
- **Frontend**: React SPA (Vite) + React Router
- **Backend**: Express.js (TypeScript)
- **Database**: Supabase (PostgreSQL) avec JSON fallback
- **Auth**: Supabase Auth (OTP email) + JWT local

### Processus Clé: Commande par Virement
1. Client ajout au panier
2. Client clique "Payer"
3. Page paiement affiche coordonnées bancaires
4. Client click "Confirmer" → POST /api/orders
5. Email admin notifie nouvelle commande
6. Client upload preuve → POST /api/orders/:id/proof
7. Email admin reçoit preuve + image attachée
8. Admin valide → PATCH /api/admin/orders/:id (status: "Validée")

### Technologies Majeures
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind v4** - Styling
- **Motion** - Animations
- **Express** - Backend
- **Supabase** - Database + Auth
- **Resend** - Email notifications

### Points d'Intégration
- **Frontend ↔ Backend**: Fetch API (`/api/*`)
- **Backend ↔ Database**: Supabase SDK + JSON files
- **Backend ↔ Email**: Resend API
- **Frontend ↔ Storage**: localStorage (cart, user, token)

---

## 🔄 WORKFLOW TYPIQUE

### Vendre un produit
```
Customer Login
    ↓
Browse Products (/boutique)
    ↓
Add to Cart (CartContext + localStorage)
    ↓
View Cart (/panier)
    ↓
Click "Payer" → /paiement
    ↓
Create Order (/api/orders) → Email admin
    ↓
Upload Proof (/api/orders/:id/proof) → Email admin with proof
    ↓
Admin Validates (PATCH /api/admin/orders/:id)
    ↓
Order Status: "Validée"
```

---

## ⚠️ COMMON GOTCHAS

1. **localStorage & CORS**
   - Frontend localStorage ne persiste pas cross-origin
   - Cart data doit être re-fetch après logout

2. **Supabase Offline**
   - JSON files sont fallback, pas 100% sync
   - Wishlist ne fonctionne pas offline

3. **File Uploads**
   - Multer sauve dans `public/uploads/proofs/`
   - À deployer: public folder doit exister

4. **JWT Expiration**
   - Token Supabase expire après quelques heures
   - Besoin: Auto-refresh token (TODO)

5. **Admin Check**
   - Admin détecté par email === ADMIN_EMAIL
   - Change facilement dans .env

---

## 🆘 TROUBLESHOOTING

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti :3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### "TypeError: Cannot read property 'user' of undefined (auth)"
- Check: localStorage['user'] exists
- Check: supabase.auth.getSession() initialized
- Check: .env vars set

### "FileNotFoundError: Cannot find file in public/uploads"
```bash
mkdir -p public/uploads/proofs
```

### "TypeError: Cannot destructure property 'user' of useAuth()"
- useAuth() must be inside AuthProvider
- Check: App.tsx has `<AuthProvider>` wrapper

---

## 📊 PROJECT STATS

| Métrique | Valeur |
|----------|--------|
| **Total fichiers source** | ~40 |
| **Total lignes code** | ~3000+ |
| **Pages** | 13 |
| **Composants** | 6+ |
| **Contextes** | 3 |
| **Routes API** | 11 |
| **Produits** | 36 |
| **Dépendances** | 34 |
| **Build size** | ~300KB (gzipped) |

---

## 🤝 CONTRIBUTION GUIDE

### Avant de modifier
1. Lis le fichier pertinent dans `/docs/`
2. Checke `FLUX_DETAILLES.md` pour comprendre le flux
3. Update la doc correspondante après changement
4. Test localement: `npm run dev`
5. Lint: `npm run lint`

### Avant de deployer
1. Run checklist dans [TECH_STACK.md](./TECH_STACK.md#-deployment-checklist)
2. Test build: `npm run build`
3. Backup database
4. Monitor après déploiement

---

## 📞 SUPPORT

**Contact Hervé**: askipas62@gmail.com
**Localisation**: Saint-Sornin, Charente, France
**Email support**: via Resend API
**Database**: Supabase Dashboard

---

## 📄 LICENSE

Propriété d'Hervé Appiotti - 2026
Utilisation commerciale autorisée.

---

## 🗺️ NAVIGATION RAPIDE

| Besoin | Fichier | Ligne |
|--------|---------|-------|
| Ajouter produit | `server.ts` → `seedProducts()` | ~95 |
| Changer couleur principale | `GUIDE_VISUEL.md` | Color Palette |
| Ajouter page | `src/App.tsx` | Routes section |
| Modifier footer | `src/components/Footer.tsx` | - |
| Changer bank details | `src/pages/Payment.tsx` | bankDetails object |
| Ajouter route API | `server.ts` | Routes section |
| Modifier CSS buttons | `GUIDE_VISUEL.md` | Button Styles |

---

## 🎓 LEARNING RESOURCES

- **React Official Docs**: https://react.dev
- **Vite Guide**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Supabase Docs**: https://supabase.com/docs
- **Express.js**: https://expressjs.com
- **TypeScript Handbook**: https://www.typescriptlang.org/docs

---

*Documentation principale - 10 mai 2026*
*Dernière mise à jour: 10/05/2026*
