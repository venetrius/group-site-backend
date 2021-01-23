const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/github',  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' , 'session': true}),
  function(req, res) {
    const token = jwt.sign(req.session.passport.user, process.env.JWT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}login/?token=${token}`);
   // res.send(JSON.stringify({token}))
});

module.exports = router;
