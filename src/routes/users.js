
const express = require('express');
const router = express.Router();

/* GET user profile. */
router.get('/profile', function(req, res) {
  res.json({data: req.user});
});

module.exports = router;
