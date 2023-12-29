const express = require("express");

//zabezpieczenie routów
const checkAuth = require("../middleware/checkAuth");

//ładuje kontroler
const playersController = require("../controllers/players");

//wyciągam router
const router = express.Router();
router.get("/", playersController.players_get_all);

router.post("/", checkAuth, playersController.players_add_new);

router.get("/:id", playersController.players_get_by_id);

router.put("/:id", checkAuth, playersController.players_change);

router.delete("/:id", checkAuth, playersController.players_delete);

module.exports = router;
