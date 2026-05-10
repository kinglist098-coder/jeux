# 📄 INDEX FICHIERS CLÉS - QUICK REFERENCE

## 🔵 FICHIERS CONFIGURATION

| Fichier | Lignes | Description |
|---------|--------|-------------|
| package.json | 56 | Dépendances, scripts build, version |
| tsconfig.json | 22 | Config TypeScript, paths alias, JSX |
| vite.config.ts | 35 | Build config Vite, plugins, proxy API |
| .env.local | - | Secrets: SUPABASE_URL, RESEND_API_KEY, JWT_SECRET |
| index.html | - | Entry point HTML, div root |

---

## 🟢 FICHIERS SERVEUR

| Fichier | Lignes | Logique Clé |
|---------|--------|-----------|
| **server.ts** | 368 | Express principal<br/>- Routes Auth (signup/login)<br/>- Routes Produits (GET /api/products)<br/>- Routes Commandes (POST/GET orders)<br/>- Routes Admin (PATCH status)<br/>- Multer file upload<br/>- Supabase + JSON fallback<br/>- Email via Resend |

---

## 🔴 FICHIERS FRONTEND - ENTRY POINTS

| Fichier | Lignes | Description |
|---------|--------|-------------|
| src/main.tsx | 10 | React root, ToastProvider |
| src/index.css | - | Tailwind imports, custom CSS |
| src/vite-env.d.ts | - | Type definitions import.meta.env |

---

## 🟠 FICHIER APP

| Fichier | Lignes | Logique Clé |
|---------|--------|-----------|
| **src/App.tsx** | 81 | Router principal<br/>- BrowserRouter<br/>- Lazy-load 13 pages<br/>- ProtectedRoute (auth required)<br/>- AdminRoute (admin only)<br/>- Suspense fallback |

---

## 💚 FICHIERS CONTEXTE (STATE GLOBAL)

| Fichier | Lignes | Interface | Logique |
|---------|--------|-----------|---------|
| **src/context/AuthContext.tsx** | 98 | `AuthContextType` | Supabase + JWT<br/>localStorage persist<br/>Admin check email<br/>Login/Logout |
| **src/context/CartContext.tsx** | 66 | `CartContextType` | localStorage cart<br/>Add/Remove/Update qty<br/>Auto totalTTC calc |
| **src/context/WishlistContext.tsx** | 82 | `WishlistContextType` | Supabase wishlist table<br/>Toggle add/remove<br/>Async operations |

---

## 🔵 FICHIERS PAGES (src/pages/)

| Fichier | Lignes | Route | Contenu Principal |
|---------|--------|-------|------------------|
| **Home.tsx** | 301 | `/` | Hero + 6 catégories + Produits vedette + Flash sale + Newsletter |
| **Shop.tsx** | 250+ | `/boutique` | Filters (category, price) + Grid produits + Search |
| **ProductDetail.tsx** | - | `/boutique/:id` | Images + Desc + Stock + Rating + Add to cart/wishlist |
| **Auth.tsx** | 323 | `/connexion`, `/inscription` | Signup/Login/Verify/ForgotPassword multi-views |
| **Cart.tsx** | - | `/panier` | List items ± qty + Summary sidebar + Total TTC |
| **Payment.tsx** | 368 | `/paiement` | Manifesto + Bank details + Create order + Upload proof |
| **AdminDashboard.tsx** | 255 | `/admin/dashboard` | Stats + Table commandes + Filter + Update status |
| **ClientDashboard.tsx** | - | `/client/dashboard` | Commandes + Favoris + Profil |
| **Legal.tsx** | - | `/mentions-legales` | Mentions légales |
| **CGV.tsx** | - | `/cgv` | Conditions générales de vente |
| **Contact.tsx** | - | `/contact` | Formulaire contact |
| **About.tsx** | - | `/a-propos` | À propos Appiotti |
| **SafetyAndPayment.tsx** | - | `/securite-virement` | Info sécurité virement |
| **ResetPassword.tsx** | - | `/reset-password` | Réinit password token |

---

## 🟣 FICHIERS COMPOSANTS (src/components/)

| Fichier | Lignes | Responsabilité |
|---------|--------|----------------|
| **ProductCard.tsx** | 189 | Affichage produit min (image, nom, prix, add panier, favori) |
| **Header.tsx** | 166 | Navigation sticky, search, cart badge, user menu, mobile toggle |
| **Footer.tsx** | - | Links, contact, legal |
| **QuickViewModal.tsx** | - | Modal produit rapide |
| **CategoryIcons.tsx** | - | SVG icons 6 catégories |
| **ui/Toast.tsx** | - | Toast notifications system (Context + AnimatePresence) |

---

## 📦 FICHIERS SERVICES (src/lib/, src/services/)

| Fichier | Description |
|---------|-------------|
| **src/lib/supabase.ts** | Supabase client init avec env vars |
| **src/services/supabaseService.ts** | Wrapper API Supabase (produits, commandes, auth) |

---

## 📋 FICHIERS DONNÉES (data/)

| Fichier | Structure | Cas d'usage |
|---------|-----------|-----------|
| **data/users.json** | `[{id, email, password (hash), firstName, lastName, isAdmin}]` | Fallback JWT si Supabase offline |
| **data/products.json** | `[{id, name, category, priceHT, stock, badge, rating, desc, image}]` | Catalog 36 produits (seed auto si vide) |
| **data/orders.json** | `[{id, userId, items, totalTTC, status, createdAt, proofUrl}]` | Historique commandes, statuts |

---

## 🖼️ FICHIERS ASSETS (public/)

| Dossier | Contenu |
|---------|---------|
| public/images/hero-bg.jpg | Image fond hero |
| public/images/gaming-scene.jpg | Image gaming hero droit |
| public/images/categories/*.jpg | Images categories (6) |
| public/images/products/*.jpg | Images produits (36) |
| public/uploads/proofs/ | Uploads preuves virement (Multer) |

---

## 🏗️ POINTS D'INTÉGRATION CLÉS

### Frontend → Backend
```
CartContext.addToCart() → localStorage
                       → (optionnel: sync serveur)

ProductCard.handleAddToCart() → CartContext
                              → Toast

AuthContext.login() → localStorage + state
                   → redirect boutique

WishlistContext.toggleWishlist() → Supabase wishlist table
                                 → local state update
```

### Backend → Services
```
POST /api/orders
  ├─ Multer file handling
  ├─ writeDB(ORDERS_FILE)
  ├─ Supabase sync (optionnel)
  └─ Resend email

GET /api/products
  ├─ readDB(PRODUCTS_FILE)
  ├─ Filter by category/price
  └─ Return filtered
```

### Services → Databases
```
readDB(file) → fs.readFileSync() → JSON.parse()
writeDB(file, data) → fs.writeFileSync() → JSON.stringify()

Supabase:
  ├─ supabase.auth.* (authentification)
  ├─ supabase.from('wishlist').select() (données)
  └─ supabase.from('orders').update() (sync)
```

---

## 🔐 FLUX AUTH CLÉS

**Login**: user email+password → Supabase auth → Token JWT → localStorage
**Signup**: email+password → Verify OTP → Token → localStorage
**Logout**: Clear token + localStorage + Supabase signOut
**Admin check**: `user.email === process.env.ADMIN_EMAIL`
**Protected routes**: `useAuth()` hook check user != null

---

## 💳 FLUX VIREMENT CLÉS

1. **Cart** → "Payer" → `/paiement`
2. **Payment page** → "Confirmer commande"
   - POST /api/orders → `{id: "ORD-XXX", status: "En attente"}`
   - Email admin notification
3. **Client** → Upload preuve
   - POST /api/orders/:id/proof → Multer save + DB update status
   - Email admin avec preuve
4. **Admin dashboard** → Modal preuve
   - PATCH /api/admin/orders/:id → status: "Validée"
5. **Workflow**: En attente → Validation → Validée → Expédiée → Livrée

---

## 🎯 SEARCH RAPIDE PAR FONCTION

### Je cherche le code pour...

**Authentification**
→ AuthContext.tsx (ligne 1-98)
→ Auth.tsx pages (ligne 1-323)

**Panier**
→ CartContext.tsx (ligne 1-66)
→ Cart.tsx page (ligne 1-120)

**Favoris**
→ WishlistContext.tsx (ligne 1-82)

**Produits**
→ server.ts GET /api/products (ligne 180-210)
→ Shop.tsx (ligne 1-250)
→ ProductCard.tsx (ligne 1-189)

**Commandes**
→ server.ts POST /api/orders (ligne 220-250)
→ Payment.tsx page (ligne 1-368)
→ AdminDashboard.tsx (ligne 1-255)

**Email**
→ server.ts Resend integration (ligne 240, 380)
→ Déterminant: RESEND_API_KEY env var

**Upload fichiers**
→ server.ts Multer config (ligne 55-65)
→ POST /api/orders/:id/proof (ligne 340-380)

**Styles Tailwind**
→ Index dans GUIDE_VISUEL.md
→ Classes principales: brand-orange, brand-dark, rounded-[32px]

**Animations Motion**
→ Home.tsx parallax + categories (ligne 80-200)
→ ProductCard.tsx hover effects (ligne 50-100)
→ Cart.tsx AnimatePresence (ligne 40-80)

---

## 📊 MÉTRIQUES PROJET

| Métrique | Valeur |
|----------|--------|
| Total pages | 13 |
| Total composants | 6 |
| Total contextes | 3 |
| Routes API | 11 |
| Produits catalog | 36 |
| Statuts commande | 7 |
| Catégories | 6 |
| Couleurs principales | 5 |
| Fichiers données | 3 |
| Dépendances npm | 30+ |

---

## 🚀 DÉPLOIEMENT

### Build
```bash
npm run build
# Génère dist/ avec Vite SPA build
```

### Production Start
```bash
npm run dev  # Run Express server
# Express serve dist/ avec SPA fallback
# HMR désactivé pour AI Studio
```

### Ports & URLs
```
Local Dev:     http://localhost:3000
API Proxy:     /api/* → http://localhost:3000
Uploads:       /uploads/* → http://localhost:3000
Vite HMR:      Activé (disabled in AI Studio)
```

---

## ⚡ QUICK CHECKLIST AVANT DÉPLOIEMENT

- [ ] Variables .env.local configurées (SUPABASE, RESEND, JWT_SECRET)
- [ ] ADMIN_EMAIL corrects
- [ ] Bank details à jour dans Payment.tsx
- [ ] Images produits links valides
- [ ] Supabase tables créées (si utilisé)
- [ ] Multer uploads directory exist (public/uploads/proofs/)
- [ ] Build no TypeScript errors: `npm run lint`
- [ ] Test page loading: Home, Shop, Cart, Payment
- [ ] Test auth: Signup, Login, Logout
- [ ] Test admin: Dashboard table loads

---

## 📞 SUPPORT & CONTACTS

**Administrateur**: askipas62@gmail.com (ADMIN_EMAIL)
**Localisation**: Saint-Sornin, Charente, France
**Email notifications**: via Resend API (onboarding@resend.dev)
**Base de données**: Supabase PostgreSQL

---

*Index rapide - 10 mai 2026*
