# API Endpoints `Defined by Application Flow`

1. User Logs in/Registers
___

- When user registers/authenticates, we need to perform a `POST` request that stores the unique user ID provided by the log in token, or the unique user email.

> [`POST`] `/api/newuser` creates a new user

- Required parameters:
    - `'name'`, `'family_id'`

NOTE: We should store the user's unique ID/name property and family_id to cookies or local storage so that we can access them later as identifiers to load the correct user data per page.

> [`POST`] `/api/fridge/:id` creates a new fridge

- Required parameters:
    - query parameter should be equal to either the user `'name'` or `'family_id'`
    - `req.body` should include:
        - `user_id` of the registered user
        - `family_id` of the registered user
        
___

2. User Opens Fridge Page

> [`GET`] `/api/fridge/:id` obtains fridge, renders all items to page, saves items array to `this.state`

- Required parameters:
    - query parameter should be equal to either the user `'name'` or `'family_id'`

> [`PUT`] `/api/fridge/:id` adds/removes items

- Required parameters:
    - query parameter should be equal to either the user `'name'` or `'family_id'`
    - `req.body` should include:
        - updated `items` array with selected (`onClick`) item (if remove button, it removes the selected item from their array then pushes to database. whereas add button adds it to the array, then pushes to database.)

---

3. User Opens Grocery/Shopping List Page

> [`POST`] `/api/shoppinglist/:id` creates a shopping list in db

- Required parameters:
    - query parameter should be equal to either the user `'name'` or `'family_id'`

> [`GET`] `/api/shoppinglist/:id` gets shopping list to populate page

- Required parameters:
    - query parameter should be equal to either the user `'name'` or `'family_id'`

> [`PUT`] `/api/shoppinglist/:id` updates user's shopping list
 
- Required parameters:
    - query parameter should be equal to either the user `'name'` or `'family_id'`
    - `req.body` should include:
        - updated `items` array with selected (`onClick`) item (if remove button, it removes the selected item from their array then pushes to database. whereas add button adds it to the array, then pushes to database.)


