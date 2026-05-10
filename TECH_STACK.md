# 🛠️ STACK TECHNOLOGIQUE & DÉPENDANCES

## 📋 RÉSUMÉ STACK

```
┌─────────────────────────────────────────────┐
│   APPIOTTI GAME SHOP - TECH STACK 2026      │
├─────────────────────────────────────────────┤
│ Frontend:  React 18 + TypeScript + Vite     │
│ Backend:   Express.js + TypeScript + Node   │
│ Database:  Supabase (PostgreSQL) + JSON     │
│ Auth:      Supabase Auth + JWT local        │
│ Styling:   Tailwind CSS v4 + Motion         │
│ Email:     Resend API                       │
│ Runtime:   Node.js 18+ (ESM)                │
│ Build:     Vite 6.2.3                       │
└─────────────────────────────────────────────┘
```

---

## 📦 DÉPENDANCES PRINCIPALES

### Production Dependencies (23)

```json
{
  "@google/genai": "^1.29.0",           // Google Gemini AI integration
  "@supabase/supabase-js": "^2.45.4",   // Supabase client
  "bcryptjs": "^3.0.3",                 // Password hashing
  "clsx": "^2.1.1",                     // Conditional classNames
  "cors": "^2.8.6",                     // CORS middleware
  "dotenv": "^17.2.3",                  // Env variables
  "express": "^4.21.2",                 // Web framework
  "jsonwebtoken": "^9.0.3",             // JWT signing/verify
  "lucide-react": "^0.546.0",           // Icon library
  "motion": "^12.23.24",                // Animation (Framer Motion fork)
  "multer": "^2.1.1",                   // File upload handling
  "react": "^18.3.1",                   // UI framework
  "react-dom": "^18.3.1",               // React DOM rendering
  "react-router-dom": "^6.28.2",        // Client routing
  "resend": "^3.5.0",                   // Email service API
  "tailwind-merge": "^3.5.0"            // Tailwind utility merge
}
```

### Development Dependencies (11)

```json
{
  "@tailwindcss/vite": "^4.1.14",        // Tailwind Vite plugin
  "@types/bcryptjs": "^2.4.6",           // Types bcryptjs
  "@types/cors": "^2.8.19",              // Types CORS
  "@types/express": "^4.17.21",          // Types Express
  "@types/jsonwebtoken": "^9.0.10",      // Types JWT
  "@types/multer": "^2.1.0",             // Types Multer
  "@types/node": "^22.14.0",             // Types Node
  "@vitejs/plugin-react": "^4.3.4",      // React Vite plugin
  "autoprefixer": "^10.4.21",            // CSS vendor prefixes
  "tailwindcss": "^4.1.14",              // CSS utility framework
  "tsx": "^4.21.0",                      // TypeScript executor
  "typescript": "~5.8.2",                // TypeScript compiler
  "vite": "^6.2.3"                       // Build tool
}
```

---

## 🎨 LIBRARIES DÉTAIL

### Frontend UI & Animation

**lucide-react** (v0.546.0)
- 600+ SVG icons
- Utilisés: ShoppingCart, Heart, User, Trash2, ArrowRight, etc.
- Import: `import { IconName } from 'lucide-react'`

**motion** (v12.23.24)
- Framer Motion fork moderne
- Utilisé: `useScroll`, `AnimatePresence`, `whileHover`, `transition`
- Parallax effects sur Home page
- Stagger animations sur listes

**tailwind-merge** (v3.5.0)
- Merge conflicting Tailwind classes intelligemment
- Utilisé rarement dans ce projet (préparer scalabilité)

**clsx** (v2.1.1)
- Conditional className strings
- Ex: `clsx('px-4', isActive && 'bg-orange')`

### Backend

**express** (v4.21.2)
- Framework HTTP minimal et flexible
- Utilisé: Routes, middleware, static files
- Port: 3000

**bcryptjs** (v3.0.3)
- Hash passwords sécurisé
- Utilisé: `await bcrypt.hash(password, 10)` et `await bcrypt.compare(password, hash)`

**jsonwebtoken** (v9.0.3)
- JWT signing/verification
- Utilisé: `jwt.sign({userId, isAdmin}, JWT_SECRET)` et `jwt.verify()`

**multer** (v2.1.1)
- Form data & file uploads
- Config: `diskStorage` → `public/uploads/proofs/`
- Utilisé: Proof uploads in POST /api/orders/:id/proof

**cors** (v2.8.6)
- Enable CORS pour API
- Config: `app.use(cors())`

**dotenv** (v17.2.3)
- Load .env.local variables
- Config: `import "dotenv/config"`

### Database & Auth

**@supabase/supabase-js** (v2.45.4)
- Supabase SDK pour PostgreSQL
- Utilisé:
  - `supabase.auth.signUp/signInWithPassword`
  - `supabase.from('products').select()`
  - `supabase.from('wishlist').insert/delete`
- Fallback: JSON files si offline

### Email

**resend** (v3.5.0)
- Email service (alternative Sendgrid/Mailgun)
- Utilisé: `resend.emails.send({from, to, subject, html, attachments})`
- Cas: Order notification, proof notification
- API key: `RESEND_API_KEY`

### Build Tools

**vite** (v6.2.3)
- Next-gen build tool (remplace Webpack)
- HMR pour dev
- Tree-shaking & code splitting

**@vitejs/plugin-react** (v4.3.4)
- Vite plugin pour React + Fast Refresh
- Babel-less JSX compilation

**@tailwindcss/vite** (v4.1.14)
- Native Tailwind v4 Vite integration
- Remplace PostCSS-based build

**tailwindcss** (v4.1.14)
- CSS utility-first framework
- Config: vite.config.ts
- Colors custom: brand-orange, brand-dark, etc.

**typescript** (v5.8.2)
- Static type checking
- Strict mode enabled
- Target: ES2022

**tsx** (v4.21.0)
- TypeScript executor pour Node
- Utilisé: `npm run dev` → tsx server.ts

---

## 🔧 CONFIGURATION CLÉS

### tsconfig.json
```jsonc
{
  "compilerOptions": {
    "target": "ES2022",           // Moderne syntax
    "module": "ESNext",           // ESM modules
    "jsx": "react-jsx",           // JSX transform
    "paths": { "@/*": ["./*"] },  // Path aliases
    "strict": true,               // Strict type checking
    "noEmit": true                // Type-only checking
  }
}
```

### vite.config.ts
```typescript
export default defineConfig(({mode}) => ({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3000' },
      '/uploads': { target: 'http://localhost:3000' }
    }
  }
}))
```

### package.json Scripts
```json
{
  "dev": "tsx server.ts",           // Run Express + Vite HMR
  "build": "vite build",            // Build optimized SPA
  "preview": "vite preview",        // Serve dist locally
  "clean": "rm -rf dist",           // Clean output
  "lint": "tsc --noEmit"            // Type check
}
```

---

## 🌐 ENVIRONNEMENT VARIABLES

### Required
```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server-only)

# Auth
JWT_SECRET=your_super_secret_key_min_32_chars
ADMIN_EMAIL=askipas62@gmail.com

# Email
RESEND_API_KEY=re_xxxxxxxx

# App
NODE_ENV=development
APP_URL=http://localhost:3000
```

### Optional
```bash
DISABLE_HMR=true              # Pour AI Studio
VITE_ADMIN_EMAIL=...          # Frontend admin check (DEPRECATED, use ADMIN_EMAIL)
```

---

## 📊 VERSION MATRIX

| Package | Version | Status |
|---------|---------|--------|
| React | 18.3.1 | ✅ Latest |
| TypeScript | 5.8.2 | ✅ Latest (strict) |
| Node | 18+ | ✅ Required |
| Vite | 6.2.3 | ✅ Latest |
| Tailwind | 4.1.14 | ✅ v4 (native) |
| Express | 4.21.2 | ✅ Latest |
| Supabase | 2.45.4 | ✅ Latest |

---

## 🔒 SÉCURITÉ

### Passwords
```typescript
// Hashing
const hash = await bcrypt.hash(password, 10);  // 10 salt rounds

// Verify
const isValid = await bcrypt.compare(password, hash);
```

### JWT
```typescript
// Sign (server)
const token = jwt.sign(
  { userId: user.id, isAdmin: user.isAdmin },
  process.env.JWT_SECRET
);

// Verify (server)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### File Upload
```typescript
// Multer config
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: `proof-${orderId}-${timestamp}.ext`
});

// Savepoint: public/uploads/proofs/ (publicly accessible)
```

### CORS
```typescript
app.use(cors());  // Allow all origins (to improve: restrictive)
```

### Environment Secrets
```javascript
// Never expose in frontend
SUPABASE_SERVICE_ROLE_KEY  // Server only
JWT_SECRET                 // Server only
RESEND_API_KEY            // Server only

// Safe for frontend
VITE_SUPABASE_URL         // Prefix VITE_
VITE_SUPABASE_ANON_KEY    // Prefix VITE_
```

---

## 🚀 PERFORMANCE

### Code Splitting
```typescript
// Vite auto-chunks dependencies
import { lazy } from 'react';
const Shop = lazy(() => import('./pages/Shop'));
// → Loaded on demand with Suspense
```

### Image Optimization
```typescript
// Fallback Unsplash images (external CDN)
src={product.image || getCategoryImage(category)}

// Consider: Local images + optimize
```

### Tree-Shaking
```javascript
// ESM imports → Vite removes unused exports
import { useCart } from '../context/CartContext';  // Only useCart imported
```

### Tailwind Purging
```javascript
// Tailwind v4 auto-purges unused classes
// No need for PurgeCSS config
```

---

## 🔄 UPDATES & COMPATIBILITY

### React 18
- Concurrent rendering
- Automatic batching
- useTransition (for pending states)

### TypeScript 5.8
- `const` type parameters
- Better type inference
- Strict null checks enabled

### Tailwind CSS v4
- Native CSS engine (no PostCSS)
- Faster compilation
- Better @apply support

### Vite 6
- Improved HMR
- Better CSS handling
- Faster cold start

---

## 🧪 TESTING SETUP (NOT IMPLEMENTED)

**Recommandé pour production**:
```bash
npm install -D vitest @testing-library/react jsdom

// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
```

---

## 📚 RESSOURCES ESSENTIELLES

### Documentation
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **TypeScript**: https://www.typescriptlang.org
- **Tailwind**: https://tailwindcss.com
- **Supabase**: https://supabase.com/docs
- **Express**: https://expressjs.com
- **Motion**: https://motion.dev

### CDNs & APIs
- **Unsplash**: https://unsplash.com (images fallback)
- **Resend**: https://resend.com (emails)
- **Supabase**: https://supabase.com (database)

---

## 🎯 TECH DECISIONS RATIONALE

### Pourquoi Vite over Webpack?
- Faster dev server (HMR < 100ms)
- Simpler config
- ESM native support
- Smaller bundle

### Pourquoi Supabase?
- PostgreSQL backend hébergé
- Auth native (Magic Link, OAuth)
- Real-time subscriptions (optionnel)
- JSON fallback built-in

### Pourquoi Express?
- Minimal et flexible
- Très familier ecosystem
- Simple file upload (Multer)
- Easy deploy

### Pourquoi Motion not Framer?
- Lighter bundle
- Same API
- Better React 18 support

### Pourquoi Resend not Nodemailer?
- No SMTP config needed
- Reliable delivery
- Easy templating
- Affordable

---

## ⚠️ TECHNICAL DEBT & TODOs

```javascript
// TODO: HIGH PRIORITY
- [ ] Add API rate limiting (express-rate-limit)
- [ ] Implement password reset email token
- [ ] Add product image validation before upload
- [ ] Implement order cancellation (6h window)
- [ ] Add inventory management / stock sync

// TODO: MEDIUM PRIORITY
- [ ] Add search debouncing (300ms)
- [ ] Implement cart persistence to server
- [ ] Add order tracking page
- [ ] Email notifications for order status changes
- [ ] Admin email templates (refactor from HTML strings)

// TODO: NICE TO HAVE
- [ ] Add unit tests (vitest)
- [ ] Add E2E tests (Cypress/Playwright)
- [ ] Implement wishlist export to PDF
- [ ] Add product reviews & ratings
- [ ] Implement recommendation engine
- [ ] Add dark mode toggle
- [ ] Add multi-language (i18n)
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] All env vars set in host
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Node version: 18+
- [ ] Supabase tables created (if using)
- [ ] Resend API key valid
- [ ] Uploads directory writable
- [ ] CORS configured for production domain
- [ ] SSL/HTTPS enabled
- [ ] Database backups enabled
- [ ] Error logging enabled
- [ ] Monitor: Server uptime, API errors, email delivery

---

*Stack technique - 10 mai 2026*
