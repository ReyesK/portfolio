const express = require('express');
const router = express.Router();
const controller = require('../controllers/session');

router.get('/user', controller.user);

module.exports = router;
