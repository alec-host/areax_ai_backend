
const { Sequelize } = require("sequelize");
const sequelize = require("../db/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize,Sequelize);
db.users.preferences = require("./user.preference.model")(sequelize,Sequelize);
db.users.activities = require("../models/user.activity.model")(sequelize,Sequelize);
db.otps = require("../models/generated.otp.model")(sequelize,Sequelize);

module.exports = db;