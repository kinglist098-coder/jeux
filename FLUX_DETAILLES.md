# 🔄 FLUX DÉTAILLÉS & LOGIQUE MÉTIER

## TABLE DES MATIÈRES
1. [Flux d'Authentification](#flux-dauthentification)
2. [Flux Panier & Achat](#flux-panier--achat)
3. [Flux Paiement Virement](#flux-paiement-virement)
4. [Flux Admin & Validation](#flux-admin--validation)
5. [Flux Wishlist/Favoris](#flux-wishlistfavoris)
6. [Gestion Erreurs](#gestion-erreurs)

---

## FLUX D'AUTHENTIFICATION

### Signup (Inscription)

```
User → /inscription
  ↓
Auth.tsx (mode="signup")
  ├─ Formulaire: Email, Password, FirstName, LastName
  ├─ Click "S'inscrire"
  ├─ supabase.auth.signUp({email, password, data: {firstName, lastName}})
  │   └─ Envoie code OTP par email Supabase
  ├─ if error → Toast erreur + console.error
  ├─ if success → setView("verify")
  │
Auth.tsx (view="verify")
  ├─ Affiche: "Vérifiez votre email ${email}"
  ├─ Input: Code OTP 6 chiffres
  ├─ Click "Vérifier"
  ├─ supabase.auth.verifyOtp({email, token, type: 'signup'})
  │   └─ Vérifie code OTP
  ├─ if error → Toast erreur
  ├─ if success:
  │   ├─ AuthContext.login(token, user)
  │   │   └─ setUser, setToken
  │   │   └─ localStorage['token'] = token
  │   │   └─ localStorage['user'] = {email, firstName, lastName, isAdmin}
  │   ├─ Toast "Email vérifié! Bienvenue."
  │   └─ navigate("/boutique")
```

### Login (Connexion)

```
User → /connexion
  ↓
Auth.tsx (mode="login")
  ├─ Formulaire: Email, Password
  ├─ Click "Connexion"
  ├─ supabase.auth.signInWithPassword({email, password})
  ├─ if error → Toast erreur (email/password incorrect)
  ├─ if success:
  │   ├─ AuthContext.login(token, user)
  │   │   └─ Idem signup
  │   ├─ Toast "Bon retour!"
  │   └─ navigate("/boutique")
```

### Logout (Déconnexion)

```
User → Click "Déconnexion" (Header)
  ↓
Header.tsx
  ├─ handleLogout()
  ├─ AuthContext.logout()
  │   ├─ supabase.auth.signOut()
  │   ├─ setToken(null)
  │   ├─ setUser(null)
  │   ├─ localStorage.removeItem('token')
  │   └─ localStorage.removeItem('user')
  ├─ navigate("/connexion")
```

### Forgot Password (Mot de passe oublié)

```
User → /connexion
  ├─ Click "Mot de passe oublié?"
  │
Auth.tsx (view="forgot-password")
  ├─ Formulaire: Email
  ├─ Click "Envoyer lien"
  ├─ supabase.auth.resetPasswordForEmail(email, {redirectTo: "/reset-password"})
  ├─ if error → Toast erreur
  ├─ if success:
  │   ├─ Toast "Email de réinitialisation envoyé!"
  │   └─ setView("login")
  │
User reçoit email avec lien
  ├─ Click lien
  ├─ Redirigé → /reset-password?token=xxx
  │
ResetPassword.tsx
  ├─ supabase.auth.updateUser({password: newPassword})
  ├─ if success:
  │   ├─ Toast "Mot de passe réinitialisé"
  │   └─ navigate("/connexion")
```

### Persistence entre rechargements

```
Initial app load:
  ↓
AuthProvider useEffect()
  ├─ Lire localStorage['token'] et localStorage['user']
  ├─ if exist: setToken, setUser (initial state)
  ├─ supabase.auth.getSession()
  │   └─ Vérifie session Supabase valide
  ├─ if session valid:
  │   └─ Update state + localStorage (sync)
  ├─ if session expired:
  │   └─ Logout (clear localStorage)
  │
supabase.auth.onAuthStateChange()
  └─ Listener: mise à jour automatique sur sign-in/out/refresh
```

---

## FLUX PANIER & ACHAT

### Ajouter au Panier

```
ProductCard / ProductDetail
  ├─ Button "Ajouter au panier"
  ├─ handleAddToCart()
  │   ├─ setIsAdding(true)
  │   ├─ setTimeout(600ms) pour animation
  │   ├─ CartContext.addToCart(product)
  │   │   ├─ Si produit exists: quantity++
  │   │   ├─ Sinon: [...items, {id, name, priceHT, category, quantity: 1, image}]
  │   │   └─ localStorage['cart'] = JSON.stringify(items)
  │   ├─ addToast("${product.name} ajouté au panier!", "success")
  │   └─ setIsAdding(false)
```

### État du Panier

```
CartContext:
  items: CartItem[] (localStorage persist)
  
CartItem {
  id: string
  name: string
  priceHT: number
  quantity: number
  category: string
  image?: string
}

Calculs auto:
  totalHT = items.reduce((sum, item) => sum + item.priceHT * item.quantity, 0)
  totalTTC = totalHT * 1.2
  itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
```

### Voir Panier

```
User → Click Cart icon (Header)
  ├─ Header badge: itemCount
  ├─ navigate("/panier")
  │
Cart.tsx
  ├─ if itemCount === 0:
  │   └─ Show "Panier vide" + Lien "/boutique"
  ├─ else:
  │   ├─ List items avec:
  │   │   ├─ Image + Nom + Catégorie
  │   │   ├─ Buttons ± quantité
  │   │   ├─ Button Supprimer
  │   │   └─ Prix TTC item
  │   ├─ Summary sidebar:
  │   │   ├─ Articles count
  │   │   ├─ Sous-total HT
  │   │   ├─ TVA 20%
  │   │   ├─ Livraison (Gratuit >100€)
  │   │   ├─ Total TTC (gros, couleur orange)
  │   │   └─ Button "Payer par virement"
```

### Modifier Quantité

```
Cart.tsx
  ├─ Button +
  │   └─ CartContext.updateQuantity(itemId, +1)
  │       ├─ newQty = Math.max(1, quantity + 1)
  │       └─ setItems([...updated])
  │
  ├─ Button -
  │   └─ CartContext.updateQuantity(itemId, -1)
  │       ├─ newQty = Math.max(1, quantity - 1)
  │       └─ setItems([...updated])
```

### Supprimer du Panier

```
Cart.tsx / ProductCard
  ├─ Button Trash
  ├─ CartContext.removeFromCart(itemId)
  │   └─ setItems(prev => prev.filter(i => i.id !== itemId))
  ├─ localStorage update auto (useEffect)
  ├─ Header badge count décrément
```

---

## FLUX PAIEMENT VIREMENT

### Page Paiement

```
User (connecté) → /panier
  ├─ Summary "Payer par virement"
  ├─ navigate("/paiement")
  │
Payment.tsx
  ├─ Affiche:
  │   ├─ Manifesto section: Pourquoi virement? (6 raisons)
  │   ├─ Détails bancaires (copie-clipboard):
  │   │   ├─ Titulaire: "MONSIEUR HERVÉ APPIOTTI"
  │   │   ├─ IBAN: "FR76 1234 5678 9012 3456 7890 123"
  │   │   ├─ BIC: "APPIFR2X"
  │   │   └─ Banque: "Crédit Agricole Charente"
  │   ├─ 4 étapes: Valider → Virement → Preuve → Validation
  │   ├─ Total à régler (gros, TTC)
  │   └─ Button "Confirmer ma commande"
```

### Créer Commande

```
Payment.tsx
  ├─ Click "Confirmer ma commande"
  ├─ handleCreateOrder()
  │   ├─ setLoading(true)
  │   ├─ POST /api/orders
  │   │   ├─ Body: {items: CartItem[], totalTTC}
  │   │   ├─ Header: Authorization: Bearer ${token}
  │   │
  │   SERVER (server.ts POST /api/orders):
  │   │   ├─ getAuthUser(req) → Récupère user depuis JWT
  │   │   ├─ if !user: 401 "Non autorisé"
  │   │   ├─ Crée order:
  │   │   │   {
  │   │   │     id: "ORD-" + random,
  │   │   │     userId: user.id,
  │   │   │     items: req.body.items,
  │   │   │     totalTTC: req.body.totalTTC,
  │   │   │     status: "En attente de virement",
  │   │   │     createdAt: ISO timestamp,
  │   │   │     proofUploaded: false
  │   │   │   }
  │   │   ├─ writeDB(ORDERS_FILE, [...orders, newOrder])
  │   │   │
  │   │   ├─ if RESEND_API_KEY:
  │   │   │   ├─ resend.emails.send({
  │   │   │   │     from: 'Appiotti Game Shop <onboarding@resend.dev>',
  │   │   │   │     to: ADMIN_EMAIL,
  │   │   │   │     subject: '🆕 Nouvelle commande - ${orderId}',
  │   │   │   │     html: <custom email>
  │   │   │   │   })
  │   │   │   └─ Email inclut: Nom client, total, n° ordre
  │   │   │
  │   │   └─ Return: newOrder (avec id)
  │   │
  │   ├─ if res.ok:
  │   │   ├─ setOrderId(data.id)
  │   │   ├─ setOrderCreated(true)
  │   │   ├─ addToast("Commande créée avec succès!", "success")
  │   │
  │   └─ else:
  │       └─ addToast(error.message, "error")
  │       └─ setLoading(false)
  │
Payment.tsx (orderCreated === true)
  ├─ Affiche: Récapitulatif orderId
  ├─ Input: Upload preuve virement (photo, scan)
  ├─ Button "Envoyer la preuve"
```

### Upload Preuve Virement

```
Payment.tsx
  ├─ User sélectionne fichier (JPG/PNG)
  ├─ setFile(file)
  ├─ Click "Envoyer la preuve"
  ├─ handleUploadProof()
  │   ├─ if !file: return
  │   ├─ setLoading(true)
  │   ├─ formData = new FormData()
  │   ├─ formData.append("proof", file)
  │   ├─ POST /api/orders/${orderId}/proof
  │   │   ├─ MultiPart form-data
  │   │   ├─ Header: Authorization: Bearer ${token}
  │   │
  │   SERVER (server.ts POST /api/orders/:id/proof):
  │   │   ├─ Multer middleware: upload.single("proof")
  │   │   │   └─ Save file → public/uploads/proofs/proof-${orderId}-${timestamp}.ext
  │   │   │
  │   │   ├─ getAuthUser(req) → Vérifie authentification
  │   │   ├─ if !user: 401 "Non autorisé"
  │   │   ├─ readDB(ORDERS_FILE)
  │   │   ├─ Trouver order par id + userId (security)
  │   │   ├─ if not found: 404 "Commande non trouvée"
  │   │   │
  │   │   ├─ Update order:
  │   │   │   ├─ proofUploaded: true
  │   │   │   ├─ status: "En cours de validation"
  │   │   │   └─ proofUrl: `/uploads/proofs/${filename}`
  │   │   │
  │   │   ├─ writeDB(ORDERS_FILE, [...updated])
  │   │   │
  │   │   ├─ if supabase: Sync status Supabase
  │   │   │
  │   │   ├─ if RESEND_API_KEY:
  │   │   │   └─ resend.emails.send({
  │   │   │       from: 'Appiotti...',
  │   │   │       to: ADMIN_EMAIL,
  │   │   │       subject: '📦 Nouvelle preuve de paiement - ${orderId}',
  │   │   │       attachments: [{filename, content}],
  │   │   │       html: <email avec preuve>
  │   │   │     })
  │   │   │
  │   │   └─ Return: updated order
  │   │
  │   ├─ if res.ok:
  │   │   ├─ addToast("Preuve envoyée! Validation en cours", "success")
  │   │   ├─ CartContext.clearCart()
  │   │   └─ navigate("/")
  │   │
  │   └─ else:
  │       └─ addToast("Erreur lors de l'envoi", "error")
```

---

## FLUX ADMIN & VALIDATION

### Accès Dashboard Admin

```
User (isAdmin) → Header
  ├─ Logo link "A"
  ├─ LayoutDashboard icon visible
  ├─ Click → navigate("/admin/dashboard")
  │
AdminDashboard.tsx (Protected by AdminRoute)
  ├─ useAuth hook: if !user.isAdmin: <Navigate to="/" />
  │
Dashboard affiche:
  ├─ Stats: Total, En attente, CA, Nouveaux clients
  ├─ Table toutes commandes:
  │   ├─ ID, Date, Total, Preuve (link), Statut, Actions
  │   └─ Filtrage par statut (dropdown)
```

### Charger Commandes Admin

```
AdminDashboard.tsx useEffect()
  ├─ loadOrders()
  │   ├─ setLoading(true)
  │   ├─ GET /api/admin/orders
  │   │   ├─ Header: Authorization: Bearer ${token}
  │   │
  │   SERVER (server.ts GET /api/admin/orders):
  │   │   ├─ getAuthUser(req)
  │   │   ├─ if !user || !user.isAdmin: 403 "Accès refusé"
  │   │   ├─ readDB(ORDERS_FILE)
  │   │   └─ Return: all orders JSON
  │   │
  │   ├─ setOrders(data)
  │   └─ setLoading(false)
```

### Voir Preuve & Valider Commande

```
AdminDashboard.tsx
  ├─ Table row → Click "Voir Preuve" button
  │
  ├─ if order.proofUploaded:
  │   ├─ setSelectedOrder(order)
  │   ├─ Modal affiche: Image preuve (img src={proofUrl})
  │   ├─ Buttons: "Valider le paiement", "Refuser"
  │   │
  │   ├─ Click "Valider le paiement"
  │   ├─ updateStatus(orderId, "Validée")
  │   │   ├─ setUpdatingId(orderId)
  │   │   ├─ PATCH /api/admin/orders/${orderId}
  │   │   │   ├─ Body: {status: "Validée"}
  │   │   │   ├─ Header: Authorization: Bearer ${token}
  │   │   │
  │   │   SERVER (server.ts PATCH /api/admin/orders/:id):
  │   │   │   ├─ getAuthUser(req)
  │   │   │   ├─ if !user.isAdmin: 403
  │   │   │   ├─ readDB(ORDERS_FILE)
  │   │   │   ├─ Trouver order par id
  │   │   │   ├─ orders[index].status = req.body.status
  │   │   │   ├─ writeDB(ORDERS_FILE, [...updated])
  │   │   │   ├─ if supabase: Update remote
  │   │   │   └─ Return: updated order
  │   │   │
  │   │   ├─ addToast("Statut mis à jour: Validée", "success")
  │   │   ├─ loadOrders() (refresh table)
  │   │   └─ setSelectedOrder(null) (close modal)
  │   │
  │   └─ Click "Refuser"
  │       └─ updateStatus(orderId, "Annulée") (idem)
```

### Workflow Complet Statuts

```
"En attente de virement"
  ↓ (Client upload preuve)
"En cours de validation"
  ↓ (Admin valide)
"Validée"
  ↓ (Admin click "Expédier")
"Expédiée"
  ↓ (Admin click "Livrer")
"Livrée"

Alternativement:
  "Refusée" (Admin click "Refuser")
  "Annulée" (Admin click "Annuler")
```

---

## FLUX WISHLIST/FAVORIS

### Ajouter aux Favoris

```
ProductCard / ProductDetail
  ├─ Button Heart (blanc/empty)
  ├─ Click handleWishlist()
  ├─ WishlistContext.toggleWishlist(productId)
  │   ├─ if !user:
  │   │   └─ addToast("Veuillez vous connecter", "error")
  │   │   └─ return
  │   │
  │   ├─ setProcessingId(productId)
  │   ├─ setLoading(true)
  │   ├─ supabase.auth.getUser() → userId
  │   ├─ isCurrentlyIn = wishlist.includes(productId)
  │   │
  │   ├─ if isCurrentlyIn:
  │   │   ├─ DELETE wishlist
  │   │   │   .eq('user_id', userId)
  │   │   │   .eq('product_id', productId)
  │   │   ├─ setWishlist(prev => prev.filter(id => id !== productId))
  │   │   └─ addToast("Produit retiré des favoris", "success")
  │   │
  │   ├─ else:
  │   │   ├─ INSERT wishlist
  │   │   │   {user_id: userId, product_id: productId}
  │   │   ├─ setWishlist(prev => [...prev, productId])
  │   │   └─ addToast("Produit ajouté aux favoris ❤️", "success")
  │   │
  │   ├─ setLoading(false)
  │   └─ setProcessingId(null)
```

### État Favoris

```
ProductCard:
  ├─ isFavorite = isInWishlist(product.id)
  ├─ isWishlistLoading = processingId === product.id
  ├─ Button Heart:
  │   ├─ fill={isFavorite}
  │   ├─ color={isFavorite ? "orange" : "white"}
  │   └─ disabled={isWishlistLoading}
```

### Charger Favoris à Connexion

```
WishlistProvider useEffect([user, token]):
  ├─ if !user || !token:
  │   └─ setWishlist([])
  │   └─ return
  │
  ├─ fetchWishlist()
  │   ├─ setLoading(true)
  │   ├─ supabase.auth.getUser() → userId
  │   ├─ supabase
  │   │   .from('wishlist')
  │   │   .select('product_id')
  │   │   .eq('user_id', userId)
  │   │
  │   ├─ if error:
  │   │   └─ console.error()
  │   │
  │   ├─ setWishlist(data.map(item => item.product_id))
  │   └─ setLoading(false)
```

### Voir Favoris en Dashboard Client

```
ClientDashboard.tsx
  ├─ Tab "Mes favoris"
  ├─ WishlistContext.wishlist
  ├─ Fetch products: /api/products?id in wishlist
  ├─ Grid ProductCard (isFavorite toujours true)
  ├─ Click Heart → Remove favoris + refresh
```

---

## GESTION ERREURS

### Frontend Error Handling

```
Try-Catch Block:
  ├─ API call fail
  │   └─ addToast(error.message, "error")
  │
  ├─ Auth fail
  │   └─ addToast("Email ou mot de passe incorrect", "error")
  │
  ├─ File upload fail
  │   └─ addToast("Erreur lors de l'envoi de la preuve", "error")
  │
  ├─ Supabase connection lost
  │   └─ localStorage fallback (si possible)
```

### Backend Error Handling

```
server.ts:

POST /api/auth/signup:
  ├─ if email exists: 400 "Cet email est déjà utilisé"
  ├─ if validation fails: 400 error detail

POST /api/orders:
  ├─ if !user: 401 "Non autorisé"
  ├─ else: 201 Created

POST /api/orders/:id/proof:
  ├─ if !user: 401
  ├─ if order not found: 404
  ├─ if file upload fail: 500 error
  ├─ else: 200 OK

GET /api/admin/orders:
  ├─ if !user || !isAdmin: 403 "Accès refusé"
  ├─ else: 200 orders

PATCH /api/admin/orders/:id:
  ├─ if !admin: 403
  ├─ if order not found: 404
  ├─ else: 200 updated
```

### Toast Notifications

```
Success:
  ├─ Couleur: Vert (#06D6A0)
  ├─ Icon: CheckCircle ✓
  ├─ Ex: "Produit ajouté au panier!"
  └─ Duration: 5s auto-close

Error:
  ├─ Couleur: Rouge
  ├─ Icon: AlertCircle ⚠️
  ├─ Ex: "Erreur lors de la création de la commande"
  └─ Duration: 5s auto-close

Info:
  ├─ Couleur: Orange (#FF6B35)
  ├─ Icon: Info ℹ️
  ├─ Ex: "Veuillez vérifier votre email"
  └─ Duration: 5s auto-close
```

---

## SCÉNARIOS EDGE CASES

### 1. Panier vide → Click "Payer"
```
Cart.tsx redirect:
  ├─ if itemCount === 0:
  │   └─ <Navigate to="/boutique" />
```

### 2. Session expirée → API 401
```
Interceptor (not yet implemented, considérer):
  ├─ if response 401:
  │   ├─ Logout + redirect "/connexion"
  │   └─ Toast "Session expirée, reconnectez-vous"
```

### 3. Double-click "Ajouter panier"
```
ProductCard:
  ├─ setIsAdding(true)
  ├─ disable button pendant 600ms
  ├─ Empêche double-ajout
```

### 4. Upload fichier trop volumineux
```
Multer config (server.ts):
  ├─ limit: 10MB (à implémenter si besoin)
  ├─ Si > limite: 413 Payload Too Large
```

### 5. Admin supprime produit mais client l'a en panier
```
Comportement actuel:
  ├─ Produit reste en panier
  ├─ Au checkout: Order créée avec item "fantôme"
  ├─ Stock check: À implémenter
```

### 6. Connexion Supabase perdue mais user authentifié
```
AuthContext:
  ├─ Token JWT toujours valide
  ├─ localStorage persist user
  ├─ API continue fonctionner (Express fallback)
  ├─ Wishlist fail silencieusement (dégrade gracefully)
```

---

## PERFORMANCE & OPTIMIZATIONS

### Lazy Loading Pages
```
import { lazy } from 'react';
const Shop = lazy(() => import('./pages/Shop'));

// Suspense fallback
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/boutique" element={<Shop />} />
  </Routes>
</Suspense>
```

### Image Optimization
```
ProductCard:
  ├─ product.image || getCategoryImage(category)
  ├─ Unsplash fallback si image missing
  ├─ referrerPolicy="no-referrer"
```

### Debounce Search
```
Shop.tsx:
  ├─ onChange input search
  ├─ setSearchParams (immediate)
  ├─ À améliorer: useCallback + debounce 300ms
```

### localStorage Throttle
```
CartProvider useEffect([items]):
  ├─ localStorage.setItem('cart', JSON.stringify(items))
  ├─ À améliorer: debounce 500ms pour fréquent updates
```

---

*Documentation flux le 10 mai 2026*
