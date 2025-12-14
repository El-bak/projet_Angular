# MyShop

Lancer l'application

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

2. Liste des produits

Appel de GET /api/products/
avec filtres : page, page_size, min_rating, ordering

Liste paginée avec Angular Material

Loading + error states gérés via NgRx

Navigation Prev/Next

3. Notation des produits

Appel de GET /api/products/:id/rating/

Champ de saisie de productId + dropdown de notation

Appel POST de notation

Affichage du résultat + erreurs éventuelles

4. Panier / Shopping Cart (NgRx)

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

5. Checkout Flow (3 étapes)

Checkout multi-étapes :

- Summary (récapitulatif du panier)
- Address (formulaire utilisateur)
- Confirmation (validation finale)

Navigation controlée entre les étapes

Validation de commande mockée

6. Persistence (LocalStorage)

Synchronisation du panier

NgRx Store <-> LocalStorage

Restauration automatique du panier au refresh

7. Wishlist (Bonus)

Ajout / retrait de produits en wishlist

Slice NgRx wishlist

Badge dynamique dans le header

Page Wishlist dédiée :

- Affichage des produits
- Retrait de la wishlist
- Ajout direct au panier

Persistence via LocalStorage

8. Notification (Toast)

Toast pour page produit

Toast global via ToastService

Notifications lors de :

- Ajout à la wishlist
- Retrait de la wishlist
- Ajout au panier depuis la wishlist

Toast affiché au niveau de l'application (AppComponent)

9. Notation des produits

Appel GET /api/products/:id/rating/

Saisie du productId + sélection de la note

Appel POST de notation

Gestion des erreurs et affichage du résultat

10. Architecture NgRx

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

Effects principaux

AuthEffects → login / refresh

ProductsEffects → loadProducts

RatingEffects → loadRating + submitRating

Regroupés dans app.config.ts.

11. UI & Design

Angular Material (buttons, inputs, cards, select, snackbars)

Mise en page simple & responsive

Messages de chargement, erreurs visibles et notifications.

12. Lancer Storybook

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
--------------------X----------------------
