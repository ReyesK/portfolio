const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/versions', function(req, res, next) {
  res.status(200).send(process.versions);
});

module.exports = router;
