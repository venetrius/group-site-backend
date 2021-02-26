const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

let dataHelpers = null;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) =>
  {
    dataHelpers.getUserById(id, (user) => done(null, user))
  }
);

const createUserProfile = function(profile){
  const userProfile = {
      token : profile.id,
      photo : profile.photos.length > 0 ? profile.photos[0].value : null,
      display_name: profile.displayName,
      user_name: profile.username,
  }
  return userProfile;
}

const setUpLinkedinPassport = function (dataHelpers){
  passport.use(
    new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
      dataHelpers.getUserByToken(
        profile.id,
        function (error, user) {
          if (user) {
            done(null, user);
          } else {
            const userProfile = createUserProfile(profile);
            dataHelpers.createUser(
              userProfile,
              function (err, user) {
                done(null, user[0]);
              }
            );
          }
        }
      )
    }
  ))
}

module.exports = setUpLinkedinPassport;
