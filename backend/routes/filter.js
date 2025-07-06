const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const filterController = require("../controllers/filter.js");

//for displaying the listing based on filter
router
    .route("/:id")
    .get(wrapAsync(filterController.filter));

module.exports = router; 