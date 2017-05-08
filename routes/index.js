var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var environment = require('./../.env')

var mongoKey = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@cluster0-shard-00-00-4iued.mongodb.net:27017,cluster0-shard-00-01-4iued.mongodb.net:27017,cluster0-shard-00-02-4iued.mongodb.net:27017/nodestuff?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

var db, albums;

MongoClient.connect(mongoKey, (err, database) => {
  if (err) return console.log(err)
  db = database
})

router.get('/', function(req, res) {
  db.collection('albums').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('shopping.ejs', {albums: results})
  })
})

module.exports = router;
