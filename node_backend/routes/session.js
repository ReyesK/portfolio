var express = require('express');
var router = express.Router();
var controller = require('../controllers/session');

router.get('/user', controller.user);

module.exports = router;
