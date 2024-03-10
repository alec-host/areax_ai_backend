const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const { APP_SERVER_PORT } = require("../constants/app_constants");
const db = require("../models");

const PORT = APP_SERVER_PORT;

app.use(cors());
app.use(express.json());

db.sequelize.sync()
  .then(() => {
  console.log("Synced db.");
})
  .catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

app.use(morgan('tiny'));

app.use(express.static('uploads'));

//-.routes.
require("../routes/app.routes")(app);

module.exports = {
    app,
    PORT
};