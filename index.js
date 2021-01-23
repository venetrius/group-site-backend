require('dotenv').config();
const PORT          = process.env.PORT || 3030;
const express       = require("express");
const cors          = require('cors');
const bodyParser    = require("body-parser");
const cookieParser  = require('cookie-parser');
const morgan        = require("morgan");
const app           = express();
const datahelpers   = require('./src/DataHelpers/data-helpers');
const passport      = require('passport');
const passportSetup = require('./src/authConfig/passport-github')(datahelpers.users);
const jwt = require('jsonwebtoken');

const path = require('path');
const authRoutes    = require('./src/routes/auth-routes');
const usersRoutes   = require('./src/routes/users');
const projectRoutes = require("./src/routes/projects.js")(datahelpers);

// TODO: move this function from this file
function middleware(req, res, next) {
  let user;

  if (req.headers["authorization"]) {
    const header = req.headers["authorization"].replace(/Bearer\s+/i, "")
    user = jwt.verify(header, process.env.JWT_SECRET);

    req.user = user;
  }
  next();
}

const authorize = (req, res, next) => {
  if (!req.user) {
    res.status(403).json({ error: "Unauthorized" });
    return
  }
  next();
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use("/projects", middleware, projectRoutes);
app.use("/user", middleware, authorize, usersRoutes);

const server = app.listen(process.env.PORT || PORT, () => {

  console.log("Example app listening on port " + (process.env.PORT || PORT));

});

module.exports = server;
