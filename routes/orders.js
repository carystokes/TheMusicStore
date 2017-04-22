var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
});

router.post('/add', function(req, res) {
  res.json(404, {status:false, message:"no results found"})
})

module.exports = router;
