const Router = require("express");
const router = new Router();
const resultController = require("../controllers/resultController");

router.post("/create", resultController.create);
router.get("/getAll", resultController.getAll);

module.exports = router;
