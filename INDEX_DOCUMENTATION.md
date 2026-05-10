# 📚 INDEX DOCUMENTATION - START HERE

Bienvenue ! Ce fichier vous aide à naviguer dans la documentation du projet **Appiotti Game Shop**.

---

## 🎯 CHOISIS TON PROFIL

### 👨‍💼 Je suis Product Manager / CEO
Je veux comprendre le **business model** et les **capacités du produit**.

**Fichiers à lire:**
1. [README_DOCUMENTATION.md](./README_DOCUMENTATION.md) - Vue d'ensemble générale
2. [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-flux-données-principales) - Flux métier principal (vente par virement)

**Résumé:** 
- 36 produits, 6 catégories
- Paiement par virement bancaire (unique)
- Admin dashboard pour gérer commandes
- Email notifications automatiques

---

### 👨‍💻 Je suis Frontend Developer
Je veux comprendre l'**interface utilisateur** et comment **ajouter des features**.

**Fichiers à lire (dans cet ordre):**
1. [README_DOCUMENTATION.md](./README_DOCUMENTATION.md#-quick-start) - Quick start
2. [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-pages--composants) - Pages et composants
3. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md) - Layout des pages
4. [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-dauthentification) - Comment les flux fonctionnent
5. [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-je-cherche-le-code-pour) - Chercher un fichier spécifique

**Quick commands:**
```bash
npm run dev              # Start dev server
npm run lint            # Check types
npm run build           # Production build
```

---

### 🔧 Je suis Backend / Full-Stack Developer
Je veux comprendre l'**API** et la **logique serveur**.

**Fichiers à lire (dans cet ordre):**
1. [README_DOCUMENTATION.md](./README_DOCUMENTATION.md#-quick-start) - Quick start
2. [TECH_STACK.md](./TECH_STACK.md) - Technologies & dépendances
3. [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-routes-api-backend-serverts) - Routes API
4. [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-paiement-virement) - Flux paiement détaillé
5. [INDEX_FICHIERS.md](./INDEX_FICHIERS.md) - Fichiers server.ts principal

**Clé:** `server.ts` est le cœur du backend (368 lignes)

---

### 🚀 Je dois déployer en production
Je veux la **checklist de déploiement** et les **configurations d'environnement**.

**Fichiers à lire:**
1. [TECH_STACK.md](./TECH_STACK.md#-deployment-checklist) - **Checklist déploiement**
2. [TECH_STACK.md](./TECH_STACK.md#-environnement-variables) - Variables d'environnement requises
3. [README_DOCUMENTATION.md](./README_DOCUMENTATION.md#-configuration) - Setup .env.local
4. [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-environnement-envlocal) - Détails env vars

**Essentiels:**
- Node 18+
- Supabase account + credentials
- Resend API key
- ADMIN_EMAIL configuré

---

### 🐛 Je dois déboguer / fixer un bug
Je veux comprendre un **flux spécifique** pour identifier le problème.

**Fichiers à lire:**
1. [FLUX_DETAILLES.md](./FLUX_DETAILLES.md) - Cherche le flux pertinent
2. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#debugging) - Commandes debug
3. [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-je-cherche-le-code-pour) - Trouve le fichier affecté

**Tools:**
- Browser DevTools (Network, Console)
- `npm run lint` - Type errors
- Server logs - Console output
- Supabase Dashboard - Check data

---

### 📖 Je dois ajouter une nouvelle feature
Je veux comprendre **comment modifier le projet** sans casser les choses.

**Fichiers à lire:**
1. [FLUX_DETAILLES.md](./FLUX_DETAILLES.md) - Comprends le flux actuel
2. [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-points-dintégration-clés) - Points d'intégration
3. [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md) - Voir si la feature existe
4. [TECH_STACK.md](./TECH_STACK.md#-technical-debt--todos) - TODOs suggérés

**Approche:**
1. Trace le flux actuel similaire
2. Identifie les fichiers à modifier (Frontend + Backend)
3. Update documentation après
4. Test localement
5. `npm run lint` avant commit

---

### 🎨 Je dois redesigner / modifier le CSS
Je veux comprendre la **palette de couleurs** et les **patterns de styling**.

**Fichiers à lire:**
1. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#color-palette) - Couleurs principales
2. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#typography-classes) - Typographie
3. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#common-patterns) - Patterns réutilisables
4. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#-structure-visuelle-de-lapplication) - Layout pages

**Colors:**
- `brand-orange` (#FF6B35) - Principale CTA
- `brand-dark` (#1B1B2F) - Navy headings
- `brand-yellow` (#FFD23F) - Accents
- `brand-green` (#06D6A0) - Success

---

## 📁 FICHIERS DOCUMENTATION (EN DÉTAIL)

### 1. [README_DOCUMENTATION.md](./README_DOCUMENTATION.md) ⭐ START HERE
- **Longueur**: Moyen
- **Contenu**: Vue d'ensemble générale, quick start, troubleshooting
- **Quand**: Première lecture pour comprendre le projet
- **Sections clés**:
  - Vue d'ensemble du projet
  - Documentation disponible (index des 5 docs)
  - Quick start (installation, config, démarrage)
  - Reading guide par profil
  - Troubleshooting

---

### 2. [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md) 🏗️
- **Longueur**: Long (très complet)
- **Contenu**: Architecture, fichiers, pages, composants, contextes, API, sécurité
- **Quand**: Besoin de vue d'ensemble technique complète
- **Sections clés**:
  - Vue d'ensemble
  - Flux architectural
  - Pages & composants
  - Contextes (Auth, Cart, Wishlist)
  - Routes API
  - Données & persistance
  - Design et styling
  - Flux de données
  - Sécurité
  - Produits seed data

---

### 3. [FLUX_DETAILLES.md](./FLUX_DETAILLES.md) 🔄
- **Longueur**: Long
- **Contenu**: Flux pas-à-pas de chaque fonctionnalité clé
- **Quand**: Tracer une action du début à la fin
- **Sections clés**:
  - Authentification (Signup, Login, Logout, Password reset)
  - Panier & achat
  - Paiement virement (4 étapes)
  - Admin & validation
  - Wishlist/favoris
  - Gestion erreurs
  - Edge cases

---

### 4. [INDEX_FICHIERS.md](./INDEX_FICHIERS.md) 📇
- **Longueur**: Moyen
- **Contenu**: Index fichiers, tables de référence rapide
- **Quand**: Chercher un fichier spécifique ou comprendre où trouve quoi
- **Sections clés**:
  - Table tous les fichiers
  - Points d'intégration
  - Search rapide par fonction
  - Métriques projet
  - Checklist déploiement

---

### 5. [GUIDE_VISUEL.md](./GUIDE_VISUEL.md) 🎨
- **Longueur**: Moyen
- **Contenu**: ASCII layouts, couleurs, typographie, commandes
- **Quand**: Besoin de voir le design des pages
- **Sections clés**:
  - Structure visuelle pages
  - Home layout détaillé
  - Shop layout
  - Cart layout
  - Payment layout
  - Admin dashboard layout
  - Color palette
  - Typography
  - Button styles
  - Commandes utiles

---

### 6. [TECH_STACK.md](./TECH_STACK.md) ⚙️
- **Longueur**: Long
- **Contenu**: Tech stack, dépendances npm, config, sécurité, déploiement
- **Quand**: Configurer, ajouter dépendance, ou déployer
- **Sections clés**:
  - Stack résumé
  - Toutes dépendances (avec versions)
  - Configuration (tsconfig, vite.config, package.json)
  - Variables d'environnement
  - Sécurité (passwords, JWT, files)
  - Performance & optimizations
  - Testing setup
  - Tech decisions rationale
  - Technical debt & TODOs
  - **Deployment checklist**

---

## 🗺️ NAVIGATION PAR CAS D'USAGE

### "Je veux ajouter un nouveau produit"
→ Cherche `seedProducts()` dans [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#je-cherche-le-code-pour)
→ Modifie `server.ts` → Ajoute objet produit

### "Je veux changer la couleur principale orange"
→ [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#color-palette)
→ `brand-orange` = #FF6B35
→ Remplace dans Tailwind config ou manuellement

### "L'upload de preuve ne fonctionne pas"
→ [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#upload-preuve-virement) - Trace le flux
→ Check: public/uploads/proofs/ exists
→ Check: Multer config dans server.ts
→ Check: Authorization header

### "Je dois modifier le process de paiement"
→ [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-paiement-virement) - Comprends le flux actuel
→ [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-pages--composants) - Payment.tsx
→ Modifie: Frontend (Payment.tsx) + Backend (server.ts POST /api/orders)

### "Admin ne peut pas accéder au dashboard"
→ [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#accès-dashboard-admin) - Trace le flux
→ Check: user.isAdmin = true
→ Check: ADMIN_EMAIL corrects

### "Je dois ajouter une page"
→ [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-fichiers-pages-srcpages) - Vois structure
→ Crée: `src/pages/NewPage.tsx`
→ Ajoute route dans `src/App.tsx`
→ Ajoute nav link dans `Header.tsx`

### "Aucune image de produit ne s'affiche"
→ Check: paths publics/images/products/*.jpg exists
→ Check: ProductCard.tsx fallback Unsplash
→ Vois: [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#image-optimization)

### "Je dois deployer demain"
→ [TECH_STACK.md](./TECH_STACK.md#-deployment-checklist) - Checklist complet
→ Prépare: Node 18+, Supabase, Resend key
→ Run: `npm run build && npm run lint`

---

## 🔍 CHERCHER RAPIDEMENT

**Par technologie:**
- React → [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-app-structure)
- TypeScript → [TECH_STACK.md](./TECH_STACK.md#typescript-582)
- Tailwind → [GUIDE_VISUEL.md](./GUIDE_VISUEL.md#color-palette)
- Supabase → [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-données--persistance)
- Express → [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#-routes-api-backend-serverts)

**Par flux:**
- Auth → [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-dauthentification)
- Cart → [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-panier--achat)
- Payment → [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-paiement-virement)
- Admin → [FLUX_DETAILLES.md](./FLUX_DETAILLES.md#flux-admin--validation)

**Par fichier:**
- server.ts → [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-fichiers-serveur)
- App.tsx → [INDEX_FICHIERS.md](./INDEX_FICHIERS.md#-fichier-app)
- CartContext.tsx → [ARCHITECTURE_COMPLETE.md](./ARCHITECTURE_COMPLETE.md#cartcontexttsx-66-lignes)

---

## 📞 BESOIN D'AIDE?

1. **Bug?** → Lire [FLUX_DETAILLES.md](./FLUX_DETAILLES.md) pour le flux pertinent
2. **Configurer?** → Lire [README_DOCUMENTATION.md](./README_DOCUMENTATION.md#-configuration)
3. **Déployer?** → Lire [TECH_STACK.md](./TECH_STACK.md#-deployment-checklist)
4. **Ajouter feature?** → Lire [README_DOCUMENTATION.md](./README_DOCUMENTATION.md#-contribution-guide)

---

## 📊 STATISTIQUES DOCS

| Document | Pages | Sections | Pour qui |
|----------|-------|----------|----------|
| README_DOCUMENTATION.md | ~15 | 20+ | Tous |
| ARCHITECTURE_COMPLETE.md | ~30 | 30+ | Devs + PMs |
| FLUX_DETAILLES.md | ~25 | 20+ | Devs |
| INDEX_FICHIERS.md | ~20 | 15+ | Devs |
| GUIDE_VISUEL.md | ~20 | 20+ | Frontend + Design |
| TECH_STACK.md | ~25 | 25+ | Backend + Ops |
| **TOTAL** | **~135** | **~130** | **Équipe complète** |

---

## ✅ CHECKLIST DE LECTURE

**Pour commencer:**
- [ ] Lis [README_DOCUMENTATION.md](./README_DOCUMENTATION.md)
- [ ] Lis profil correspondant (section "CHOISIS TON PROFIL")
- [ ] Installe: `npm install`
- [ ] Configure: `.env.local`
- [ ] Démarre: `npm run dev`

**Pour contribuer:**
- [ ] Lis documentation pertinente
- [ ] Trace le flux existant dans [FLUX_DETAILLES.md](./FLUX_DETAILLES.md)
- [ ] Identifie fichiers à modifier
- [ ] Teste localement
- [ ] Run `npm run lint`
- [ ] Update documentation

**Pour déployer:**
- [ ] Complète checklist [TECH_STACK.md](./TECH_STACK.md#-deployment-checklist)
- [ ] Prépare env vars
- [ ] Run `npm run build`
- [ ] Test build localement
- [ ] Deploy & monitor

---

*Index documentation - 10 mai 2026*
*Last updated: 10/05/2026*
