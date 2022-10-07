const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/core', function(req, res, next) {
  res.send('Core Module');
});

module.exports = router;