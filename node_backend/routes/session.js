var express = require('express');
var router = express.Router();


// TODO accept jwt parameter and validate signature against client secret
router.get('/', function(req, res, next) {
  res.send("API is working properly")
});

module.exports = router;
