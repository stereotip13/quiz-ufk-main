const ApiError = require("../error/ApiError");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { User, User_rating } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJvt = (id, name, role) => {
  return jwt.sign({ id, name, otdel }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  }); //получаем jvt токен
};

class UserController {
  async registration(req, res, next) {
    const { name, password, otdel } = req.body;
    if (!name || !password) {
      return next(ApiError.badRequest("Некорректное имя или пароль"));
    }
    const candidate = await User.findOne({ where: { name } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким именем уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5); // хешируем пароль
    const user = await User.create({ name, otdel, password: hashPassword });
    const user_rating = await User_rating.create({ userId: user.id });
    const token = generateJvt(user.id, user.name, user.role);
    return res.json({ token });
  }
  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("не задан ID"));
    }
    res.json(id);
  }
}
module.exports = new UserController();
