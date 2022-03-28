const express = require("express");

const restaurantsRoute = require("./api/routes/restaurant");
const app = express();
// const morgan = require('morgan');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded());
app.use("/restaurants", restaurantsRoute);
module.exports = app;
