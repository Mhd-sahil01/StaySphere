const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer")
const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");


//show all listing , Add new list Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('image'), validateListing,wrapAsync(listingController.createListing));

//search and list all based on location
router.get("/place", wrapAsync(listingController.showSearchListing))

//Show Route, Update Route, Delete Route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('image'), validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner,wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.renderEditForm));

module.exports = router;