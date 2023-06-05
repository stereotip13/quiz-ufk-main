const { Questions } = require("../models/models");
const ApiError = require("../error/ApiError");

class QuestController {
  async create(req, res) {
    const {
      text,
      category,
      difficulty,
      right_ansv,
      wrong_ansv1,
      wrong_ansv2,
      wrong_ansv3,
    } = req.body; //получение из ответа от сервера данных
    const quest = await Questions.create({
      text,
      category,
      difficulty,
      right_ansv,
      wrong_ansv1,
      wrong_ansv2,
      wrong_ansv3,
    }); //формирование новой записи в базе данных
    return res.json(quest);
  }
  async getAll(req, res) {
    const { category, difficulty, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9; //количество товаров на страницу
    let offset = page * limit - limit; //отступ
    let question;
    if (!category && !difficulty) {
      question = await Questions.findAndCountAll({ limit, offset });
    }
    if (category && !difficulty) {
      question = await Questions.findAndCountAll({
        where: { category },
        limit,
        offset,
      });
    }
    if (!category && difficulty) {
      question = await Questions.fifindAndCountAll({
        // findAndCountAll ф-ция предназн для пагинации
        where: { difficulty },
        limit,
        offset,
      });
    }
    if (category && !difficulty) {
      question = await Questions.findAndCountAllll({
        where: { category, difficulty },
        limit,
        offset,
      });
    }
    return res.json(question);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const quest = await Questions.findOne({
      where: { id },
    });
  }
}
module.exports = new QuestController();
