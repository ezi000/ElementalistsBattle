const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, indexController.main_page);

module.exports = router;
