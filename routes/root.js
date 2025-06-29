const express = require("express");
const router = express.Router();


const rootRouter = require("../controllers/root.js");


//show all listing , (root)
router
    .get(("/"),rootRouter.root);

module.exports = router;