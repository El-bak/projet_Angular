# MyShop

🛒 My Shop — Angular E-commerce App
Présentation

My Shop est une application e-commerce développée avec Angular, NgRx et MSW, construite progressivement à travers les exercices 1 à 4.
L’objectif final est d’obtenir une application fonctionnelle, bien architecturée et proche d’un projet “production-ready”, avec une attention particulière portée à l’UX, la qualité du code, les tests et l’intégration continue.
Lancer l'application

Exercice 1 et 2

npm install

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

Fonctionnalités principales

1. Authentification

Page Login avec username/password (demo/demo)

Appel vers POST /api/auth/token/ (mocké via MSW)

Stockage des tokens access + refresh dans NgRx

Affichage de l’état connecté dans l’UI (“Connected / Not Connected”)

Bouton Logout visible uniquement si connecté

Pages protégées via guard

2. Liste des produits

Appel de GET /api/products/
avec filtres : page, page_size, min_rating, ordering, tri

Liste paginée avec Angular Material

Loading + error states gérés via NgRx

Navigation Prev/Next

Page détail produit :

image

description

prix

note moyenne

3. Notation des produits

Appel de GET /api/products/:id/rating/

Champ de saisie de productId + dropdown de notation

Appel POST de notation

Soumission d’une note :

POST /api/products/:id/rating/

Mise à jour immédiate de la moyenne

Gestion des erreurs côté UI

Affichage du résultat + erreurs éventuelles

4. Avis utilisateurs (Reviews)

Avis complets par produit :

      - note

      - commentaire

      - auteur

      - date

      - Endpoints :

GET /api/products/:id/reviews/

POST /api/products/:id/reviews/

Persistance via localStorage

Chargement automatique à l’ouverture de la page produit

UI dédiée sur la page produit

Slice NgRx reviews

Storybook :

ReviewsListComponent

états Loading, Empty, Default

5. Panier / Shopping Cart (NgRx)

Slice NgRx state/cart

Structure :

- items[]
- totalPrice
- count

Actions :

- addItem
- removeItem
- updateQuantity
- clearCart

Sélecteurs :

- selectCartItems
- selectCartTotal
- selectCartCount

Badge panier dans le header

Page panier :

- Liste des produits
- Quantité modifiable
- Suppression d'un item
- Sous-total affiché
  Persistance via localStorage

6. Checkout Flow (3 étapes)

Checkout multi-étapes :

- Summary (récapitulatif du panier)
- Address (formulaire utilisateur)
- Confirmation (validation finale)

Navigation controlée entre les étapes

Validation de commande mockée
Création de commande :

POST /api/order/

7. Persistence (LocalStorage)

Synchronisation du panier

NgRx Store <-> LocalStorage

Restauration automatique du panier au refresh

8. Promotions & règles métier avancées
   Codes promo

WELCOME10

FREESHIP

VIP20

Endpoint :

POST /api/cart/apply-promo

Calcul dynamique :

sous-total

remise

livraison

taxes

total final

Stock

Gestion du stock produit :

en stock

stock faible

rupture

Blocage de l’ajout au panier si stock = 0

Validation finale :

POST /api/cart/validate-stock

10. Wishlist (Bonus)

Ajout / retrait de produits en wishlist

Slice NgRx wishlist

Badge dynamique dans le header

Bouton cœur sur :

cartes produits

page détail produit

Page Wishlist dédiée :

- Affichage des produits
- Retrait de la wishlist
- Ajout direct au panier

Persistence via LocalStorage

11. Notification (Toast)

Toast pour page produit

Toast global via ToastService

Notifications lors de :

- Ajout à la wishlist
- Retrait de la wishlist
- Ajout au panier depuis la wishlist

Toast affiché au niveau de l'application (AppComponent)

12. Notation des produits

Appel GET /api/products/:id/rating/

Saisie du productId + sélection de la note

Appel POST de notation

Gestion des erreurs et affichage du résultat

13. Espace “Mon compte”

Pages protégées :

/account/profile

/account/orders

/account/orders/:id

Fonctionnalités :

Profil utilisateur

Préférences (newsletter, note minimale)

Historique des commandes

Détail de commande

Endpoints MSW :

GET /api/me/

PATCH /api/me/

GET /api/me/orders/

GET /api/orders/:id

14. Dashboard Admin (lecture seule)

Page /admin/dashboard

Statistiques globales :

utilisateurs

commandes

chiffre d’affaires

Top produits

Commandes récentes

Slice NgRx admin

Endpoint :

GET /api/admin/stats

15. Architecture NgRx

state/auth : login, tokens, loading, errors

state/products : liste paginée, metadata, loading, errors

state/cart : panier, total, persistence

state/wishlist : favoris

state/rating : rating GET/POST (optionnel mais implémenté)

Chaque slice contient :
✔ reducers
✔ actions
✔ selectors
✔ effects (API calls)

Lazy loading par feature module :

ShopModule

AccountModule

AdminModule

Optimisations :

ChangeDetectionStrategy.OnPush

trackBy

selectors mémoïsés

Effects principaux

AuthEffects → login / refresh

ProductsEffects → loadProducts

RatingEffects → loadRating + submitRating

Regroupés dans app.config.ts.

16. UI & Design

Angular Material (buttons, inputs, cards, select, snackbars)

Mise en page simple & responsive

Messages de chargement, erreurs visibles et notifications.
UI responsive

Feedback utilisateur clair :

loaders

erreurs

notifications (ToastService)

17. Lancer Storybook

npm run storybook

## Running unit tests

Ensuite ouvrir :
👉 http://localhost:6006

Storybook contient au moins 3 stories :

- ProductCard

- ProductsList

- LoginForm (avec actions/controls)

- CartItem

- CartSummary

- ProductDetails

- ReviewsListComponent
  To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

🛠️ Technologies

Angular

NgRx (Store, Effects, Selectors)

MSW (Mock Service Worker)

Storybook

TypeScript

Angular Material
--------------------X----------------------

Exercice 1 & 2 — Base fonctionnelle (rappel)

Les fonctionnalités suivantes étaient déjà livrées avant l’Exercice 3 :

Authentification utilisateur (login)

Tokens access / refresh

Persistance locale

State auth via NgRx

Catalogue produits

Liste paginée

Filtres basiques (note minimale, tri)

Page de détail produit

Affichage des informations

Ajout au panier

Panier (NgRx)

Ajout / suppression

Changement de quantités

Calcul du total

Persistance dans localStorage

Checkout multi-étapes

Affichage de la note moyenne d’un produit (lecture seule)

Composants exposés dans Storybook (ex : ProductCard, LoginForm, Cart)

👉 Ces éléments n’ont pas été réimplémentés dans les exercices suivants.

✨ Exercice 3 — My Shop Advanced

1. Espace “Mon compte”

Pages protégées (utilisateur connecté uniquement) :

/account/profile : profil + préférences

/account/orders : liste des commandes

/account/orders/:id : détail d’une commande

Nouveau slice NgRx user :

Profil utilisateur

Préférences (newsletter, note minimale par défaut)

Commandes

Endpoints MSW :

GET /api/me/

PATCH /api/me/

GET /api/me/orders/

GET /api/orders/:id

2. Wishlist

Ajout / suppression de produits favoris

Bouton cœur sur :

Cartes produits

Page de détail produit

Page /wishlist

Liste des produits

Ajout au panier

Suppression de la wishlist

State NgRx dédié + persistance localStorage

Endpoints MSW :

GET /api/me/wishlist/

POST /api/me/wishlist/

3. Reviews (avis utilisateurs)

Reviews complètes par produit :

Note

Commentaire

Auteur

Date

Endpoints MSW :

GET /api/products/:id/reviews/

POST /api/products/:id/reviews/

Slice NgRx reviews

Effects :

Chargement des avis à l’ouverture du produit

Création d’un avis + mise à jour de la liste

UI dédiée sur la page produit

Storybook :

ReviewsListComponent avec états Loading, Empty, Default

4. Règles métier avancées
   Promotions

Codes promo gérés via API :

WELCOME10

FREESHIP

VIP20

Endpoint MSW :

POST /api/cart/apply-promo

Taxes & livraison

Calcul dynamique depuis l’API

Récapitulatif clair :

Sous-total

Remises

Livraison

Taxes

Total final

Stock avancé

Gestion du stock produit :

En stock

Stock faible

Rupture

Blocage de l’ajout au panier si stock = 0

Validation finale du stock :

POST /api/cart/validate-stock

5. Dashboard Admin (lecture seule)

Page /admin/dashboard

Statistiques globales :

Utilisateurs

Commandes

Chiffre d’affaires

Top produits

Commandes récentes

Slice NgRx admin

Endpoint MSW :

GET /api/admin/stats

6. Architecture & performances

Découpage en feature modules :

ShopModule

AccountModule

AdminModule

Lazy loading sur les routes principales

ChangeDetectionStrategy.OnPush

trackBy sur les listes

Selectors NgRx composés et mémoïsés

🧪 Storybook

Stories existantes (Exo 1–2)

Nouvelle story :

ReviewsListComponent

D’autres stories seront ajoutées (wishlist, promo, admin stats…)

🧩 Mock API

API simulée avec MSW

Persistance en mémoire (et localStorage pour certains cas)

Aucun backend réel requis

🛠️ Technologies

Angular

NgRx (Store, Effects, Selectors)

MSW (Mock Service Worker)

Storybook

TypeScript
