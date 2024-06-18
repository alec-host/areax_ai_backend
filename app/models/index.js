const { Sequelize } = require("sequelize");

const sequelize1 = require("../db/db");
const sequelize2 = require("../db/db2");

const db = {};
const db2 = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize1;

db2.Sequelize = Sequelize;
db2.sequelize = sequelize2;

//-.database 1.
db.users = require("../models/user.model")(sequelize1,Sequelize);
db.users.preferences = require("./user.preference.model")(sequelize1,Sequelize);
db.users.activities = require("../models/user.activity.model")(sequelize1,Sequelize);
db.otps = require("./otp.model")(sequelize1,Sequelize);
//-.database 2.
db2.instagrams = require("./instagram.user.data.model")(sequelize2,Sequelize);
db2.instagrams.archive = require("./user.instagram.data.archive.model")(sequelize2,Sequelize);
db2.instagrams.activities = require("./instagram.activity.log.model")(sequelize2,Sequelize);
db2.instagrams.tokens = require("./instagram.long.lived.token.model")(sequelize2,Sequelize);

module.exports = {db,db2};