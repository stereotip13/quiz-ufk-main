const Router = require("express");
const router = new Router();
const errorHandler = require("../middleware/ErrorHandlingMiddleware");

const userRouter = require("./userRouter"); //подгружаем роуты из страниц
const startRouter = require("./startRouter");
const questRouter = require("./questRouter");
const resultRouter = require("./resultRouter");

router.use("/quest", questRouter); //сопоставляем маршруты с соответствующем роутером
router.use("/result", resultRouter);
router.use("/start", startRouter);
router.use("/user", userRouter);

// Обработка ошибок,значит это последний Middleware, внутри него не вызываем ф-цию next
module.exports = router;
