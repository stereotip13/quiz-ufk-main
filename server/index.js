require("dotenv").config();
const express = require("express");
const Sequelize = require("./db"); //импортируем объект секвалайз с данными по подключ к ДБ
const models = require("./models/models"); //подключаем базу данных в проект, видим в логах кучу сообщений это запросы к базе, можно глянуть база/схемы/таблица
const cors = require("cors"); //настройка корс, чтобы можно было отправлять запросы из браузера
const router = require("./routes/index");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json()); // чтобы наше приложение могло парсить json формат
app.use("/api", router);
app.get("/", (req, res) => {
  // первый параметр url "/" по которому этот запрос будет отрабатывать, вторым параметром ф-цию колбэк принизмающую запрос и ответ
  res.status(200).json({ message: "its allive" }); //в браузере(postmane) на порте 5000 проверяем message
});
const start = async () => {
  //все операции с ДБ являются асинхронными
  try {
    await Sequelize.authenticate(); // c помощью этой ф-ции аунтиф-т будет устанав-ся подк-е к БД
    await Sequelize.sync(); //фция сверяет состояние базы данных со схемой базы данных
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
