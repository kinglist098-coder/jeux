# 🎨 GUIDE VISUEL & COMMANDES UTILES

## STRUCTURE VISUELLE DE L'APPLICATION

```
┌─────────────────────────────────────────────────────────────────┐
│                          HEADER (sticky)                         │
│  Logo "A" + "Appiotti Game Shop" │ Nav │ Search │ Cart │ User   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        MAIN CONTENT AREA                         │
│                                                                  │
│  Route-based content:                                            │
│  ├─ /                 → Home (Hero + Categories + Promos)       │
│  ├─ /boutique         → Shop (Sidebar filters + Grid produits)  │
│  ├─ /boutique/:id     → ProductDetail (Full product view)       │
│  ├─ /panier           → Cart (Résumé + Summary sidebar)         │
│  ├─ /paiement         → Payment (Manifeste + Virement)          │
│  ├─ /connexion        → Auth (Login form)                       │
│  ├─ /inscription      → Auth (Signup form)                      │
│  ├─ /reset-password   → ResetPassword                           │
│  ├─ /client/dashboard → ClientDashboard (Commandes + Favoris)   │
│  ├─ /admin/dashboard  → AdminDashboard (Table commandes)        │
│  ├─ /a-propos         → About                                   │
│  ├─ /contact          → Contact                                 │
│  ├─ /mentions-legales → Legal                                   │
│  └─ /cgv              → CGV                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                          FOOTER                                  │
│  Links + Contact + Legal                                         │
└─────────────────────────────────────────────────────────────────┘
```

## HOME PAGE LAYOUT

```
┌──────────────────────────────────────────────────────┐
│ HERO SECTION (large, parallax, background image)     │
│                                                       │
│  LEFT: Text + Badge "ÉDITION LIMITÉE ÉTÉ 2025"     │
│        Headline: "LE PARADIS DU JEU"                 │
│        CTA: [Catalogue] [Offres Flash]              │
│                                                       │
│  RIGHT: Large image gaming scene (rotated)           │
│         Accent bubble yellow "✨"                     │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ CATEGORIES SECTION (6 large cards, 3 per row)        │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Baby-Foot │  │Ping-Pong │  │Billard   │           │
│  │ hover: ↑ │  │ hover: ↑ │  │ hover: ↑ │           │
│  │gradient  │  │gradient  │  │gradient  │           │
│  │icon+name │  │icon+name │  │icon+name │           │
│  │count     │  │count     │  │count     │           │
│  │CTA btn   │  │CTA btn   │  │CTA btn   │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │Trampoline│  │Accessoires  Consoles  │           │
│  │ ...      │  │ ...      │  │ ...      │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ COUPS DE CŒUR SECTION (8 products, 4 per row)        │
│                                                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │Product  │  │Product  │  │Product  │  │Product  │ │
│  │Badge    │  │Badge    │  │Badge    │  │Badge    │ │
│  │Image    │  │Image    │  │Image    │  │Image    │ │
│  │Name ⭐  │  │Name ⭐  │  │Name ⭐  │  │Name ⭐  │ │
│  │Price    │  │Price    │  │Price    │  │Price    │ │
│  │[+] ❤️   │  │[+] ❤️   │  │[+] ❤️   │  │[+] ❤️   │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘ │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ POURQUOI APPIOTTI (4 benefits, 1 per col)             │
│                                                       │
│  [Truck] Livraison 48h │ [Shield] Sécurité Totale    │
│  [Star] Qualité Premium │ [Phone] Support Local       │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ FLASH SALE BANNER (orange gradient background)       │
│                                                       │
│  [Timer Icon] VENTE FLASH ÉTÉ                        │
│  Jusqu'à -20%                                         │
│                     [71:59:59]  [Profiter Offre]     │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ NEWSLETTER (centered, form + button)                 │
│                                                       │
│  "Restez dans la partie!"                            │
│  [Email input..............] [S'abonner]             │
└──────────────────────────────────────────────────────┘
```

## SHOP PAGE LAYOUT

```
┌──────────────────────────────────────────────────────┐
│ HEADER: "Catalogue Appiotti"                         │
│         "${products.length} pépites trouvées"        │
│         [Search input...]        [Filters button]    │
└──────────────────────────────────────────────────────┘

┌─────────────┐  ┌────────────────────────────────────┐
│             │  │                                    │
│  SIDEBAR    │  │   PRODUCT GRID (3 columns)        │
│  (272px)    │  │                                    │
│             │  │   ┌─────────┐ ┌─────────┐         │
│ Categories  │  │   │Product  │ │Product  │ ...     │
│ ├─Baby-Foot │  │   └─────────┘ └─────────┘         │
│ ├─Ping-Pong │  │                                    │
│ ├─Billard   │  │   ┌─────────┐ ┌─────────┐         │
│ ├─Trampoline│  │   │Product  │ │Product  │ ...     │
│ ├─Accessoires   │   └─────────┘ └─────────┘         │
│ └─Consoles  │  │                                    │
│             │  │  No results state:                 │
│ Price Range │  │  [Search icon] "Aucun résultat"   │
│ ├─Min: [0€] │  │  "Élargissez votre recherche"     │
│ └─Max: [5000€]  │  [Réinitialiser filtres]          │
│             │  │                                    │
│ Support Box │  │                                    │
│ "Besoin de  │  │                                    │
│  conseil?"  │  │                                    │
│ [Nous appeler]  │                                    │
│             │  │                                    │
└─────────────┘  └────────────────────────────────────┘

Mobile (≤768px): Sidebar hidden, Toggle button shows
```

## CART PAGE LAYOUT

```
┌──────────────────────────────────────────────────────┐
│ "Mon Panier"                                         │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────┐  ┌──────────────┐
│      CART ITEMS LIST             │  │   SUMMARY    │
│                                  │  │  SIDEBAR     │
│ ┌─────────────────────────────┐  │  │              │
│ │ [Img] Product Name          │  │  │ Résumé       │
│ │ Category                    │  │  │ ─────────    │
│ │ [−] 2 [+]  $XX.XX €        │  │  │ Articles(3)  │
│ │ [Trash]                     │  │  │ $XX.XX€ HT   │
│ └─────────────────────────────┘  │  │              │
│                                  │  │ Sous-total   │
│ ┌─────────────────────────────┐  │  │ $XX.XX€ HT   │
│ │ [Img] Product Name 2        │  │  │              │
│ │ Category                    │  │  │ TVA 20%      │
│ │ [−] 1 [+]  $XX.XX €        │  │  │ $XX.XX€      │
│ │ [Trash]                     │  │  │              │
│ └─────────────────────────────┘  │  │ Expédition   │
│                                  │  │ Gratuite     │
│ ┌─────────────────────────────┐  │  │              │
│ │ ...                         │  │  │ ─────────    │
│ │                             │  │  │ TOTAL TTC    │
│ └─────────────────────────────┘  │  │ $XXX.XX€     │
│                                  │  │              │
│ [Continuer mes achats]           │  │ [Payer virement]
│                                  │  │              │
│                                  │  │ ✓ Protection │
│                                  │  │ ✓ Virement   │
│                                  │  │              │
│                                  │  │ [Complétez   │
│                                  │  │  votre été]  │
│                                  │  └──────────────┘
└──────────────────────────────────┘

Empty cart state:
┌────────────────────────────────┐
│  [Shopping Bag Icon]           │
│  "Votre panier est vide"       │
│  "On dirait que vous n'avez    │
│   pas encore trouvé la pépite" │
│  [Explorer la boutique]        │
└────────────────────────────────┘
```

## PAYMENT PAGE LAYOUT

```
┌──────────────────────────────────────────────────────┐
│ MANIFESTE SECTION (Dark hero, animated blobs)         │
│                                                       │
│ "Pourquoi le Virement?"                             │
│                                                       │
│ "Nous avons choisi de supprimer les commissions    │
│  bancaires inutiles..."                             │
│                                                       │
│ 6 Reason cards:                                      │
│ ├─ [Shield] Sécurité Bancaire                        │
│ ├─ [TrendUp] Prix Directs                            │
│ ├─ [Users] Relation Humaine                          │
│ ├─ [Zap] Anti-Spéculation                            │
│ ├─ [Heart] Engagement Éthique                        │
│ └─ [Check] Preuve Légale                             │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────┐ ┌──────────────┐
│   BANK DETAILS (left column)      │ │ ACTIONS      │
│                                  │ │ (right col)  │
│ ┌───────────────────────────────┐ │ │              │
│ │ Coordonnées Bancaires         │ │ │ Prêt à      │
│ │                               │ │ │ commander?  │
│ │ Titulaire: [Copy]             │ │ │              │
│ │ MONSIEUR HERVÉ APPIOTTI       │ │ │ Total:      │
│ │                               │ │ │ $XXX.XX€   │
│ │ IBAN: [Copy]                  │ │ │              │
│ │ FR76 1234 5678...             │ │ │ [Confirmer  │
│ │                               │ │ │  commande]  │
│ │ BIC: [Copy]                   │ │ │              │
│ │ APPIFR2X                       │ │ └──────────────┘
│ └───────────────────────────────┘ │
│                                  │ Commande créée:
│ Comment ça marche?              │ Ordonnez confirmée
│ 01. Valider la commande         │ REF: ORD-ABC123
│ 02. Effectuer le virement       │
│ 03. Télécharger la preuve       │ [Sélectionner fichier]
│ 04. Validation & Envoi          │ [Envoyer la preuve]
└──────────────────────────────────┘
```

## ADMIN DASHBOARD LAYOUT

```
┌──────────────────────────────────────────────────────┐
│ "Dashboard Admin"                                    │
│                              [Actualiser données]    │
└──────────────────────────────────────────────────────┘

┌─────────────┐ ┌─────────────┐ ┌──────────┐ ┌────────┐
│ Total       │ │ En attente  │ │ CA Total │ │Nouveaux│
│ Commandes   │ │ Commandes   │ │          │ │Clients │
│ 47          │ │ 12          │ │ $2450€   │ │ 12     │
│ [Package]   │ │ [Clock]     │ │ [Trend]  │ │[Users] │
└─────────────┘ └─────────────┘ └──────────┘ └────────┘

┌──────────────────────────────────────────────────────┐
│ Gestion des commandes                                │
│ [Tous les statuts ▼]                                │
├──────────────────────────────────────────────────────┤
│ ID      │ Date       │ Total  │ Preuve      │ Actions│
├─────────┼────────────┼────────┼─────────────┼────────┤
│ #ABC123 │ 01/05/2026 │ $100€  │ [Voir]      │ [✓][→]│
├─────────┼────────────┼────────┼─────────────┼────────┤
│ #DEF456 │ 02/05/2026 │ $250€  │ Aucune      │ [✓][→]│
├─────────┼────────────┼────────┼─────────────┼────────┤
│ #GHI789 │ 03/05/2026 │ $350€  │ [Voir]      │ [✓][→]│
└──────────────────────────────────────────────────────┘

Preuve Modal:
┌────────────────────────────────────────┐
│ Preuve de virement - ORD-ABC123   [✕]  │
├────────────────────────────────────────┤
│                                        │
│        [Bank transfer proof image]     │
│        (max 400px height)              │
│                                        │
├────────────────────────────────────────┤
│ [Valider le paiement] [Refuser]        │
└────────────────────────────────────────┘
```

## COLOR PALETTE

```
Primary Colors:
├─ brand-dark:   #1B1B2F (Navy - Header, Text)
├─ brand-orange: #FF6B35 (Orange - CTA, Highlights)
├─ brand-yellow: #FFD23F (Yellow - Accents)
├─ brand-green:  #06D6A0 (Green - Success, Validation)
└─ brand-cream:  #FFF8F0 (Cream - Background)

Secondary (Tailwind standard):
├─ sky-400/500
├─ red-500
├─ emerald-500
├─ white
└─ gray-50/100/400/500

Text Colors:
├─ text-brand-dark  (headings)
├─ text-gray-500    (body)
├─ text-white       (on dark backgrounds)
└─ text-brand-orange (highlights)

Background Classes:
├─ bg-brand-cream    (main pages)
├─ bg-brand-dark     (dark sections, header)
├─ bg-white          (cards, forms)
├─ bg-white/5/10     (dark overlay transparency)
└─ bg-gray-50        (input backgrounds)
```

## TYPOGRAPHY CLASSES

```
Headings:
├─ text-8xl font-black text-brand-dark    (Hero)
├─ text-5xl font-black text-brand-dark    (Section titles)
├─ text-3xl font-black text-brand-dark    (Page titles)
├─ text-2xl font-black font-display       (Card titles)
└─ text-lg font-bold                      (Subtitles)

Body:
├─ text-base font-medium                  (Default)
├─ text-sm font-medium                    (Small body)
├─ text-[10px] font-bold uppercase        (Labels, badges)
└─ text-xs tracking-widest uppercase      (Captions)

Monospace (prices):
├─ font-mono text-xl text-brand-orange   (Product price)
├─ font-mono text-3xl text-brand-yellow  (Cart total)
└─ font-mono text-[10px]                 (IBAN display)

Font Display (headings):
└─ font-display (custom font, très gros & bold)
```

## COMMON PATTERNS

### Button Styles
```
Primary CTA:
  bg-brand-orange hover:bg-brand-yellow text-white
  py-4 px-10 rounded-2xl font-black uppercase tracking-widest
  shadow-xl hover:scale-105 active:scale-95 transition-all

Secondary:
  bg-white/10 backdrop-blur-md border border-white/20
  hover:bg-brand-orange text-white
  py-4 px-10 rounded-2xl font-black

Danger:
  bg-red-500 hover:bg-red-600 text-white
  py-3 px-6 rounded-xl font-bold uppercase

Disabled:
  opacity-50 cursor-not-allowed
```

### Card Styles
```
Rounded corners: rounded-[32px], rounded-[48px], rounded-[64px]
Borders: border border-gray-100 / border border-white/10
Shadows: shadow-xl, shadow-2xl, shadow-lg
Hover effects: hover:shadow-2xl hover:border-brand-orange
```

### Animation Patterns
```
Motion (Framer):
  - whileHover={{ y: -10, scale: 1.02 }}
  - initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
  - transition={{ delay: idx * 0.1 }}
  - AnimatePresence for list changes
```

---

## COMMANDES UTILES

### Development
```bash
# Démarrer le serveur dev
npm run dev

# Build production
npm run build

# Preview build production locally
npm run preview

# Check TypeScript errors
npm run lint

# Clean dist folder
npm run clean
```

### Database Operations
```javascript
// Lire users.json
const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

// Écrire products.json
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));

// Seed produits (auto au démarrage si vide)
seedProducts()
```

### API Calls (Frontend)
```javascript
// Get products
GET /api/products?category=baby-foot&minPrice=100&maxPrice=300&q=classique

// Create order
POST /api/orders
Authorization: Bearer ${token}
{ items: [...], totalTTC: 250 }

// Upload proof
POST /api/orders/{orderId}/proof
FormData avec fichier "proof"

// Admin: Get all orders
GET /api/admin/orders
Authorization: Bearer ${token}

// Admin: Update status
PATCH /api/admin/orders/{orderId}
{ status: "Validée" }
```

### Debugging
```javascript
// Check auth state
console.log(useAuth()) // user, token, loading

// Check cart
console.log(useCart()) // items, totalTTC, itemCount

// Check wishlist
console.log(useWishlist()) // wishlist array, loading

// Supabase debug
supabase.auth.getSession().then(console.log)

// API test
fetch('/api/products').then(r => r.json()).then(console.log)
```

### Quick Terminal Tests
```bash
# Test server running
curl http://localhost:3000/api/products | jq

# Test specific product
curl http://localhost:3000/api/products/bf-1 | jq

# Check files exist
ls -la data/
ls -la public/uploads/proofs/

# Count products
cat data/products.json | jq 'length'
```

---

*Guide visuel et commandes le 10 mai 2026*
