var express = require('express');
var router = express.Router();
var db;

router.get('/', function(req, res) {
  res.render('registration.html')
});

router.post('/', function(req, res) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var user = req.body
  user['id'] = getRandomInt(1, 1000)
  user['password'] = 'welcome1'
  console.log(user);
  db.collection('users').save(user, (err, result) => {
    if (err) return console.log(err)
    console.log('Registration Successful')
    res.redirect('/login')
  })
})

module.exports = router;
