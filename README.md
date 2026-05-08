# Skyloop — Site vitrine

Site vitrine moderne pour Skyloop, hébergé sur **GitHub Pages**.

> Création, gestion et maintenance de sites web · Outils métier sur mesure

---

## Aperçu

- **Single-page hybride** avec pages détaillées (réalisations, tarifs, mentions légales)
- **Design tech moderne sombre** aux couleurs du logo Skyloop
- **100% responsive** (mobile, tablette, desktop)
- **Animations fluides** au scroll, parallax léger, compteurs animés
- **Formulaire de contact** intégré (Web3Forms → contact@skyloop.fr)
- **Stripe préparé** pour les paiements (création + abonnements maintenance)
- **SEO friendly** (Open Graph, meta tags, structure sémantique)

---

## Structure

```
skyloop-vitrine/
├── index.html              # Single-page principale
├── realisations.html       # Page détaillée des projets
├── tarifs.html             # Tarifs + intégration Stripe préparée
├── mentions-legales.html   # RGPD / mentions légales
├── success.html            # Page de retour Stripe après paiement
├── assets/
│   ├── css/style.css       # Style principal
│   ├── js/main.js          # JS (animations, menu, formulaire)
│   └── images/
│       ├── logoskyloop.png
│       └── screenshots/    # Captures pour les réalisations
└── README.md
```

---

## Déploiement sur GitHub Pages

1. **Créer un repository GitHub**
   ```bash
   cd skyloop-vitrine
   git init
   git add .
   git commit -m "Initial commit - Skyloop vitrine"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USER/skyloop-vitrine.git
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - Aller dans **Settings → Pages**
   - Source : `Deploy from a branch`
   - Branch : `main` / `/(root)`
   - Save

3. **Domaine personnalisé (optionnel)**
   - Pour pointer `www.skyloop.fr` vers GitHub Pages :
     - Créer un fichier `CNAME` à la racine avec : `www.skyloop.fr`
     - Côté OVH (DNS) : ajouter un enregistrement CNAME `www` → `VOTRE-USER.github.io`
     - Activer "Enforce HTTPS" sur GitHub

---

## Configuration du formulaire de contact (Web3Forms)

1. Aller sur [https://web3forms.com](https://web3forms.com)
2. Créer un compte gratuit avec **contact@skyloop.fr**
3. Récupérer votre **Access Key** (par email)
4. Dans `index.html`, remplacer :
   ```html
   data-access-key="YOUR_WEB3FORMS_ACCESS_KEY"
   ```
   par :
   ```html
   data-access-key="VOTRE-CLE-ICI"
   ```

> Sans configuration, le formulaire bascule automatiquement sur un `mailto:` qui ouvre le client mail de l'utilisateur. Pratique en repli.

**Alternatives** : Formspree, EmailJS, Netlify Forms (si déployé sur Netlify).

---

## Configuration Stripe (paiements)

Stripe est **préparé** mais **désactivé** par défaut. Pour l'activer :

### 1. Créer un compte Stripe
- [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
- Activer le compte (vérification d'identité, IBAN, etc.)

### 2. Créer les produits dans Stripe
Dashboard → Produits → "+ Ajouter un produit". Créer :

| Produit | Type | Prix HT |
|---|---|---|
| Site Vitrine | Paiement unique | 890 € |
| Site Pro / E-commerce | Paiement unique | 2 490 € |
| Maintenance Essentiel | Récurrent mensuel | 49 €/mois |
| Maintenance Business | Récurrent mensuel | 149 €/mois |
| Maintenance Premium | Récurrent mensuel | 349 €/mois |

Notez le **Price ID** de chaque produit (commence par `price_...`).

### 3. Modifier `tarifs.html`
Vers la fin du fichier, dans le bloc `<script>` :

```js
const STRIPE_PUBLIC_KEY = 'pk_live_VOTRE_CLE_PUBLIQUE'; // ou pk_test_... pour tester

const STRIPE_PRICES = {
  'vitrine':         'price_xxxxxxxxxxxxx',
  'ecommerce':       'price_xxxxxxxxxxxxx',
  'maint-essentiel': 'price_xxxxxxxxxxxxx',
  'maint-business':  'price_xxxxxxxxxxxxx',
  'maint-premium':   'price_xxxxxxxxxxxxx'
};
```

### 4. Décommenter le chargement Stripe.js
Tout en bas de `tarifs.html`, **décommentez** :
```html
<script src="https://js.stripe.com/v3/"></script>
```

### 5. Configurer le webhook (recommandé)
Pour recevoir les notifications de paiement réussis côté serveur (envoi facture, démarrage prestation, etc.), il vous faudra un endpoint backend (Node, PHP, Cloud Function...). Le site GitHub Pages étant statique, prévoir :

- Une URL de webhook séparée (Vercel, Netlify Functions, OVH PHP, etc.)
- Configurer dans Stripe : Dashboard → Developers → Webhooks → "+ Add endpoint"
- Évents à écouter : `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`

> **Sans configuration Stripe**, les boutons "S'abonner" / "Démarrer ce projet" redirigent automatiquement vers le formulaire de contact. Le site reste totalement fonctionnel.

---

## Personnalisation

### Modifier les couleurs
Dans `assets/css/style.css`, en haut du fichier :
```css
:root {
  --brand-blue: #3B82F6;
  --brand-coral: #FF6B47;
  --bg-primary: #060B18;
  /* ... */
}
```

### Ajouter une réalisation
Éditer `realisations.html` et copier un bloc `<article class="project-detail">`.

### Modifier les tarifs
Éditer `tarifs.html` et `index.html` (section #tarifs).

### Captures d'écran réelles
Mettre vos screenshots dans `assets/images/screenshots/` puis remplacer les `work__mockup` par des `<img src="...">` dans `index.html` et `realisations.html`.

---

## Commandes utiles

```bash
# Test local (avec un serveur Python)
python -m http.server 8000

# Ou avec Node
npx serve .

# Puis ouvrir : http://localhost:8000
```

---

## Compatibilité navigateurs

- Chrome / Edge : 100%
- Firefox : 100%
- Safari (desktop & iOS) : 100%
- Mobile (tous) : 100%

---

## Licence

© Skyloop. Code source propriétaire.

---

## Contact

📧 **contact@skyloop.fr**
🌐 [www.skyloop.fr](https://www.skyloop.fr)
