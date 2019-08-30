const router = require("express").Router();
const dbControllers = require("../../controllers");
////////////////
// Fridge routes
////////////////

router.route('/fridges/')
    .get(dbControllers.allFridges)

// /api/fridge/:id
router.route("/fridge/:id")
    .put(dbControllers.updateFridge)
    .post(dbControllers.addFridge)
    .get(dbControllers.getFridge)
    .delete(dbControllers.removeFridge);

///////////////
// User Routes
///////////////

// /api/newuser
router.route("/user")
    .post(dbControllers.createUser)
    .put(dbControllers.updateUserFamily)

// router.route("/user/:id")



/////////////////
// Family Routes
/////////////////

// /api/family
router.route("/family")
    .post(dbControllers.createFamily)
    .get(dbControllers.getFamily)


// /api/family/:id
router.route("/family/:id")
    .put(dbControllers.updateFamilyMembers)

///////////////////////
// ShoppingList Routes
///////////////////////

// /api/shoppinglist/:id
router.route("/shoppinglist/:id")
    .post(dbControllers.createList)
    .get(dbControllers.getList)
    .put(dbControllers.updateList)


module.exports = router;