const Router = require("express");
const router = new Router();
const startController = require("../controllers/startController");

router.post("/create", startController.create);
router.get("/getAll", startController.getAll);

module.exports = router;
