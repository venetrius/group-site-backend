"use strict";

const PORT          = 3030;
const express       = require("express");
const bodyParser    = require("body-parser");
const cookieSession = require('cookie-session');
const morgan        = require("morgan");
const app           = express();
const cors          = require('cors');
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


const datahelpers = require('./src//DataHelpers/data-helpers');

const projectRoutes = require("./src/routes/projects.js")(datahelpers);
app.use("/projects", projectRoutes);

const server = app.listen(process.env.PORT || PORT, () => {

  console.log("Example app listening on port " + (process.env.PORT || PORT));

});

// it is used by Mocha
module.exports = server;