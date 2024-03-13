const Sequelize = require("sequelize");
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_HOST } = require("../constants/app_constants");


const sequelize = new Sequelize(
   DATABASE_NAME,
   DATABASE_USER,
   DATABASE_PASS,
    {
      host: DATABASE_HOST,
      dialect: 'mysql'
    }
  );
sequelize.authenticate().then(() => {
   console.log('Connection: was successful.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

/*
const sequelize = new Sequelize(
   "defaultdb",
   "avnadmin",
   "AVNS_IS6hpdABYmThBvpWY4t",
    {
      host: "mysql://avnadmin:AVNS_IS6hpdABYmThBvpWY4t@mysql-c76337f-area-x2024.a.aivencloud.com:22694/defaultdb?ssl-mode=REQUIRED",
      dialect: 'mysql'
    }
  );
sequelize.authenticate().then(() => {
   console.log('Connection: was successful.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
*/


module.exports = sequelize;