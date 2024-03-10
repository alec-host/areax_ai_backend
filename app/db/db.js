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

console.log('DATABASE USER  ',DATABASE_USER);

module.exports = sequelize;