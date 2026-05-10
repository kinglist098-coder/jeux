# 📋 DOCUMENTATION COMPLÈTE - APPIOTTI GAME SHOP

## 🎯 Vue d'ensemble du projet

**Appiotti Game Shop** est une boutique en ligne spécialisée dans les jeux et loisirs (baby-foot, tennis de table, billard, trampolines, accessoires gaming, consoles). Le projet est une **application full-stack moderne** construite avec:

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Motion (animations)
- **Backend**: Express.js (Node.js) + TypeScript
- **Base de données**: Supabase (PostgreSQL) + JSON local (fallback)
- **Authentification**: Supabase Auth + JWT local
- **Email**: Resend API
- **Hébergement**: Vite + Express sur port 3000

---

## 📁 STRUCTURE DES FICHIERS

### Configuration & Build

**package.json**
- Dépendances principales: react, react-router-dom, supabase, express, typescript
- Scripts: `dev` (run server), `build` (vite build), `lint`, `preview`
- Version Node: ESM (type: module)

**vite.config.ts**
- Plugins: React, Tailwind CSS Vite
- Alias: `@/*` → racine du projet
- Proxy API: `/api` et `/uploads` vers `http://localhost:3000`
- HMR désactivé pour AI Studio

**tsconfig.json**
- Target: ES2022
- Module: ESNext
- Paths alias: `@/*`
- JSX: react-jsx

**server.ts** (368 lignes)
- **Serveur Express principal**
- Gère toutes les routes API
- Intégration Supabase client-side + fallback JSON
- Multer pour uploads de fichiers (preuves de paiement)

---

## 🔑 FLUX ARCHITECTURAL GLOBAL

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React SPA)                      │
├─────────────────────────────────────────────────────────────┤
│  App.tsx (routing principal avec lazy loading)              │
│  ├─ AuthProvider (Supabase + localStorage)                  │
│  ├─ CartProvider (localStorage)                             │
│  ├─ WishlistProvider (Supabase)                             │
│  └─ ToastProvider (notifications)                           │
└─────────────────────────────────────────────────────────────┘
                          ↓↑
                    /api/* calls
                          ↓↑
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js)                        │
├─────────────────────────────────────────────────────────────┤
│  POST   /api/auth/signup      → Créer compte               │
│  POST   /api/auth/login       → Connexion                  │
│  PATCH  /api/auth/me          → Profil utilisateur         │
│  GET    /api/products         → Lister produits (filtres)  │
│  GET    /api/products/:id     → Détail produit             │
│  POST   /api/orders           → Créer commande             │
│  GET    /api/orders/me        → Mes commandes              │
│  POST   /api/orders/:id/proof → Upload preuve virement     │
│  GET    /api/admin/orders     → Toutes commandes (admin)   │
│  PATCH  /api/admin/orders/:id → Changer statut (admin)     │
└─────────────────────────────────────────────────────────────┘
                          ↓↑
          Supabase (Auth + DB) + JSON (fallback)
          Email via Resend API
```

---

## 📱 PAGES & COMPOSANTS

### Pages Principales (src/pages/)

#### **Home.tsx** (301 lignes)
Landingpage avec:
- Hero banner avec parallax (motion)
- 6 catégories principales (cards interactives)
- Produits à la une (Coups de Cœur)
- Section "Pourquoi Appiotti" (4 avantages)
- Flash Sale banner countdown
- Newsletter signup
- Animations fluides avec Motion

#### **Shop.tsx**
Catalogue avec:
- Filtres par catégorie
- Filtres prix (min/max TTC)
- Recherche par nom
- Grille responsive 1-3 colonnes
- État de chargement avec skeleton
- Aucun résultat fallback

#### **Auth.tsx** (323 lignes)
Page d'authentification multi-vues:
- **Login**: Email + Password (Supabase)
- **Signup**: Email + Password + FirstName + LastName
- **Verify**: Vérification OTP email
- **Forgot-Password**: Réinitialisation password
- Validation et messages d'erreur
- Transitions animées entre vues

#### **Cart.tsx**
Panier avec:
- Liste articles avec images
- Quantité ±
- Suppression articles
- Calcul TTC (HT * 1.2)
- Résumé sidebar: total, TVA, livraison
- Lien vers paiement
- État panier vide

#### **Payment.tsx** (368 lignes)
Processus paiement par virement:
- **Manifeste**: Explique pourquoi virement (6 raisons)
- **Détails bancaires**: IBAN, BIC, Titulaire (copie-clipboard)
- **Instructions 4 étapes**: Valider → Virement → Preuve → Validation
- Création de commande
- Upload preuve de virement (Multer)
- Intégration email admin (Resend)

#### **AdminDashboard.tsx** (255 lignes)
Dashboard admin protégé:
- **Stats**: Total commandes, en attente, CA, nouveaux clients
- **Table commandes**: ID, Date, Total, Preuve, Statut, Actions
- Filtrage par statut
- Boutons actions: Valider, Expédier, Livrer, Refuser
- Modal preuve de virement
- Actualisation données

#### **ClientDashboard.tsx**
Espace client:
- Historique commandes
- Liste des favoris (Wishlist)
- Profil utilisateur
- Modification données

#### Autres pages
- **ProductDetail.tsx**: Vue détail produit + Quick View
- **About.tsx**: Infos entreprise
- **Contact.tsx**: Formulaire contact
- **Legal.tsx**: Mentions légales
- **CGV.tsx**: Conditions générales
- **SafetyAndPayment.tsx**: Info sécurité/virement
- **ResetPassword.tsx**: Réinitialisation password

---

## 🎨 COMPOSANTS RÉUTILISABLES (src/components/)

### **ProductCard.tsx** (189 lignes)
Affichage produit avec:
- Image (fallback Unsplash par catégorie)
- Badge promotion (Bestseller, Premium, etc.)
- Nom + Rating ⭐
- Prix TTC
- Boutons: Ajouter panier, Vue rapide, Favoris ❤️
- Animations au hover
- Loading states

### **Header.tsx** (166 lignes)
Navigation sticky:
- Logo + Brand
- Nav links (Boutique, Offres, L'Entreprise, Contact)
- Recherche par produit
- Panier icon avec badge count
- Wishlist icon
- User menu (Mon Espace, Déconnexion, Admin si isAdmin)
- Menu mobile responsive

### **Footer.tsx**
- Links utiles
- Conditions générales
- Mentions légales
- Contact info

### **QuickViewModal.tsx**
Modal produit rapide:
- Images produit
- Description complète
- Stock
- Ajouter au panier direct

### **CategoryIcons.tsx**
Icons SVG custom pour 6 catégories

### **ui/Toast.tsx**
Système notifications:
- Context API pour notifications globales
- Types: success (vert), error (rouge), info (orange)
- Auto-fermeture 5s
- Animée avec Motion

---

## 🔐 CONTEXTES & ÉTAT GLOBAL (src/context/)

### **AuthContext.tsx** (98 lignes)
Gestion authentification:
```typescript
interface AuthContextType {
  user: User | null;          // { email, firstName, lastName, isAdmin }
  token: string | null;
  loading: boolean;
  login: (token, user) => void;
  logout: () => void;
}
```
- Initialisation depuis localStorage (backward compat)
- Écoute sessions Supabase (onAuthStateChange)
- Détection admin via email
- Logout efface localStorage

### **CartContext.tsx** (66 lignes)
Gestion panier:
```typescript
interface CartContextType {
  items: CartItem[];
  addToCart: (product) => void;
  removeFromCart: (productId) => void;
  updateQuantity: (productId, delta) => void;
  clearCart: () => void;
  totalHT: number;
  totalTTC: number;
  itemCount: number;
}
```
- Persistence localStorage
- Calcul auto totalHT + totalTTC (20% TVA)
- Quantité min 1

### **WishlistContext.tsx** (82 lignes)
Favoris (Supabase):
```typescript
interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId) => Promise<void>;
  isInWishlist: (productId) => boolean;
  loading: boolean;
  processingId: string | null;
}
```
- Fetch depuis table `wishlist` Supabase
- Add/Remove async
- Toast feedback
- Loading state par produit

---

## 🔌 SERVICES & UTILS (src/lib/, src/services/)

### **lib/supabase.ts**
Initialisation client Supabase:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Warning si variables manquantes

### **services/supabaseService.ts**
Fonctions API Supabase:
- `getProducts()`
- `getProductById(id)`
- `createOrder(order)`
- `getMyOrders(userId)`
- `signUp(email, password, metadata)`
- `signIn(email, password)`
- `signOut()`

---

## 🚀 ROUTES API BACKEND (server.ts)

### AUTH
```
POST   /api/auth/signup
POST   /api/auth/login
PATCH  /api/auth/me          (Authentification requise)
```
- Validation email unique
- Hash password bcryptjs
- JWT signing (JWT_SECRET env)
- Admin check: email === ADMIN_EMAIL

### PRODUCTS
```
GET    /api/products         (?category, ?minPrice, ?maxPrice, ?q)
GET    /api/products/:id
```
- Filtrage réactif
- Prix calculé HT * 1.2 pour TTC
- Recherche case-insensitive

### ORDERS (Client)
```
POST   /api/orders           → Créer commande
GET    /api/orders/me        → Mes commandes
POST   /api/orders/:id/proof → Upload preuve + email admin
```
- Réservation 72h articles
- Status progression: "En attente" → "Validation" → "Validée"
- Email notification admin via Resend

### ADMIN
```
GET    /api/admin/orders     → Toutes les commandes
PATCH  /api/admin/orders/:id → Update status
```
- Checkadmin: `!user.isAdmin` → 403
- Statuts: Validée, Expédiée, Livrée, Annulée, Refusée

### STATIC
```
GET    /uploads/*
```
- Serve fichiers proofs uploadés

---

## 🛢️ DONNÉES & PERSISTANCE

### Base de données JSON (fallback)
```
data/
├── users.json      → [{id, email, password (hash), firstName, lastName, isAdmin}]
├── products.json   → [{id, name, category, priceHT, stock, badge, rating, desc, image}]
└── orders.json     → [{id, userId, items, totalTTC, status, createdAt, proofUrl}]
```

### Supabase Tables (optionnel)
- `auth.users` (natif Supabase)
- `products` (sync avec JSON si existante)
- `orders` (sync avec JSON)
- `wishlist` (user_id, product_id)

### Fichiers uploads
```
public/uploads/proofs/
└── proof-{orderId}-{timestamp}.{ext}
```

---

## 🎨 DESIGN & STYLING

### Couleurs Principales (Tailwind)
- `brand-dark`: #1B1B2F (Navy)
- `brand-orange`: #FF6B35 (Orange principal)
- `brand-yellow`: #FFD23F (Jaune)
- `brand-green`: #06D6A0 (Vert)
- `brand-cream`: #FFF8F0 (Crème background)

### Typographie
- Font display: Classe font-display (à configurer Tailwind)
- Font-family mono pour prix/codes

### Animations
- **Motion/Framer**: 
  - `whileHover={{ y: -10 }}`
  - `animate={{ opacity: 1, y: 0 }}`
  - `useScroll` parallax
  - Stagger children
  - AnimatePresence

---

## 📊 FLUX DONNÉES PRINCIPALES

### 1. ACHAT PRODUIT
```
ProductCard (Ajouter) 
  → CartContext.addToCart()
  → localStorage['cart'] update
  → Header badge count +1
  → Toast "Ajouté au panier"
```

### 2. COMMANDE PAIEMENT
```
Cart page (Payer)
  → Payment page (Détails bancaires)
  → Click "Confirmer commande"
  → POST /api/orders
    ├─ Créer commande (status: "En attente")
    ├─ Email admin (Resend) avec détails
    └─ setOrderId, setOrderCreated
  → Upload preuve virement
  → POST /api/orders/{id}/proof
    ├─ Multer save fichier
    ├─ Update status → "En cours de validation"
    ├─ Email admin avec preuve attachée
    └─ clearCart() + redirect Home
```

### 3. ADMIN VALIDE COMMANDE
```
AdminDashboard
  → GET /api/admin/orders (table)
  → Click "Valider" ou modal preuve
  → PATCH /api/admin/orders/{id}
    └─ { status: "Validée" }
  → Update UI + Toast success
  → Email client validation (optionnel)
```

### 4. FAVORIS
```
ProductCard (Cœur)
  → WishlistContext.toggleWishlist()
  → Si pas connecté: Toast "Connectez-vous"
  → Si connecté: 
    ├─ POST/DELETE wishlist Supabase
    ├─ Update local state
    └─ Toast "Ajouté/Retiré des favoris"
```

---

## 🔒 SÉCURITÉ & AUTHENTIFICATION

### Auth Flow
1. **Signup**: Email + Password + Metadata → Supabase
2. **OTP Verify**: Code email → Confirme compte
3. **Login**: Email + Password → Token JWT
4. **Logout**: Supabase.signOut() + localStorage clear

### Protected Routes
- `/boutique`, `/panier`, `/paiement`, `/client/*` → Redirect `/connexion` si non-auth
- `/admin/dashboard` → Redirect `/` si non-admin

### JWT Local Fallback
- Token stocké dans localStorage
- Authorization header: `Bearer {token}`
- Admin check: `user.isAdmin` (email === ADMIN_EMAIL)

---

## 📦 PRODUITS SEED DATA

36 produits pré-loadés dans `seedProducts()`:
- **Baby-foot** (6): Classique, Pro, Enfant, Pliable, Kit, Vintage
- **Ping-Pong** (6): Standard, Premium, Pro ITTF, Mini, Set, Robot
- **Billard** (6): Américain 7ft, Anglais 6ft, Pool/Snooker, Mini, Kit, Éclairage
- **Trampoline** (6): 244cm, 366cm, Intérieur, Fitness, Semi-enterré, Kit
- **Accessoires** (6): Pack gaming, Casque, Manette PS5, Recharge, Support, Tapis
- **Consoles** (6): PS4 Slim, PS5 Slim, PS5 Pro, Switch OLED, Switch 2, Xbox Series X

Chaque produit: `{id, name, category, priceHT, stock, badge, rating, desc, image}`

---

## 🌐 ENVIRONNEMENT (.env.local)

```bash
# Supabase
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Auth
JWT_SECRET=your_secret_key
ADMIN_EMAIL=askipas62@gmail.com

# Email
RESEND_API_KEY=re_...

# App
APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📈 DÉPLOIEMENT & BUILD

### Development
```bash
npm run dev
# Serveur Express + Vite HMR sur :3000
```

### Production
```bash
npm run build
# Vite build → dist/
# Express serve dist/index.html (SPA fallback)
npm run preview
# Simule production localement
```

### Linting
```bash
npm run lint
# tsc --noEmit (check types)
```

---

## 🎯 POINTS CLE DU CODE

### 1. **Lazy Loading Pages**
```typescript
const Shop = lazy(() => import("./pages/Shop"));
// Suspense fallback dans Routes
```

### 2. **Protected Routes**
```typescript
<Route path="/boutique" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
```

### 3. **Cart Calcul**
```typescript
const totalHT = items.reduce((sum, item) => sum + item.priceHT * item.quantity, 0);
const totalTTC = totalHT * 1.2; // 20% TVA automatique
```

### 4. **Email Admin on Order**
```typescript
await resend.emails.send({
  from: 'Appiotti Game Shop <onboarding@resend.dev>',
  to: adminEmail,
  subject: `🆕 Nouvelle commande - ${newOrder.id}`,
  html: `<div>...custom HTML...</div>`
});
```

### 5. **Multer File Upload**
```typescript
const upload = multer({ 
  storage: diskStorage({
    destination: UPLOADS_DIR,
    filename: `proof-{orderId}-{timestamp}.{ext}`
  })
});
app.post("/api/orders/:id/proof", upload.single("proof"), ...)
```

### 6. **Wishlist Supabase Sync**
```typescript
const { data, error } = await supabase
  .from('wishlist')
  .select('product_id')
  .eq('user_id', userId);
```

---

## 🐛 EDGE CASES & CONSIDERATIONS

1. **Fallback JSON** si Supabase non configuré
2. **localStorage hydration** évite flashing auth
3. **Toast auto-fermeture** 5s pour UX fluide
4. **Skeleton loading** lors fetchs produits
5. **Email notifications** via Resend pour critiques (ordre, preuve)
6. **Multer disk storage** pour preuves (pas memory)
7. **Soft delete** status plutôt que hard delete (audit trail)
8. **CORS** activé pour API calls

---

## ✅ RÉSUMÉ ARCHITECTURE

**Type**: SPA React full-stack avec Express backend
**Auth**: Supabase + JWT local fallback
**Database**: Supabase (PostgreSQL) + JSON fallback
**Payments**: Virement bancaire manuel + proof upload
**Email**: Resend API pour notifications
**Frontend**: Vite + React Router + Tailwind + Motion
**Backend**: Express + Multer + Bcrypt + CORS

**Key Features**:
- Catalogue dynamique 36 produits 6 catégories
- Panier persistent localStorage
- Favoris Supabase
- Process paiement virement custom
- Admin dashboard commandes
- Email notifications
- File uploads (preuves)
- Auth multi-device
- Responsive design

---

*Documentation générée le 10 mai 2026*
