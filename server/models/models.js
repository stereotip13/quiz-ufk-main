const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  otdel: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING, defaultValue: "NEW" },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});
const User_rating = sequelize.define("user_rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.INTEGER, defaultValue: 0 },
});
const Questions_list = sequelize.define("question_list", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
});
const Questions = sequelize.define("question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  difficulty: { type: DataTypes.STRING, allowNull: false },
  right_ansv: { type: DataTypes.STRING, allowNull: false },
  wrong_ansv1: { type: DataTypes.STRING, allowNull: false },
  wrong_ansv2: { type: DataTypes.STRING, allowNull: false },
  wrong_ansv3: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Questions_list);
Questions_list.belongsTo(User);

Questions_list.hasMany(Questions);
Questions.belongsTo(Questions_list);

User.hasMany(User_rating);
User_rating.belongsTo(User);

module.exports = {
  User,
  Questions,
  Questions_list,
  User_rating,
};
