const Router = require("express");
const router = new Router();
const questController = require("../controllers/questController");

router.post("/create", questController.create);
router.get("/getAll", questController.getAll);
router.get("/:id", questController.getOne);

module.exports = router;
