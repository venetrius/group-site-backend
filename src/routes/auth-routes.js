const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { get, post } = require("axios");
// const { findOrCreateUser } = require('../authConfig/passport-github')
require("dotenv").config();
module.exports = function (dataHelpers) {
  const createUserProfile = function (profile) {
    const userProfile = {
      token: profile.id,
      photo: profile.photos.length > 0 ? profile.photos[0].value : null,
      display_name: profile.displayName,
      user_name: profile.username,
    };
    return userProfile;
  };

  const findOrCreateUser = (profile, done) => {
    dataHelpers.getUserByToken(profile.id, function (error, user) {
      if (user) {
        done(null, user);
      } else {
        const userProfile = createUserProfile(profile);
        dataHelpers.createUser(userProfile, function (err, user) {
          done(null, user[0]);
        });
      }
    });
  };

  const fetchUserData = async (code, done) => {
    try {
      const result = await post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const user_response = await get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${result.data.access_token}`,
        },
      });
      findOrCreateUser(user_response.data, done);
    } catch (e) {
      console.log({ error: e.message });
    }
  };

  router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  // router.post("", function (req, res) {
  //   console.log("post on auth root")
  //       const token = jwt.sign({name: 'gergo'}, process.env.JWT_SECRET);
  //       console.log(user.name)
  //       res.send(JSON.stringify({ token }));
  // });

  router.post("/github/callback", function (req, res) {
    fetchUserData(req.body.code, (error, user) => {
      if (error) {
        console.log('error while authenticating with GitHub', error.message)
        res.send(400);
      } else {
        const token = jwt.sign(user, process.env.JWT_SECRET);
        console.log(user.name)
        res.send(JSON.stringify({ token }));
      }
    });
  });
  return router;
};
