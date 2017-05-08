var MongoClient = require('mongodb').MongoClient;
var environment = require('./.env')

var mongoKey = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@cluster0-shard-00-00-4iued.mongodb.net:27017,cluster0-shard-00-01-4iued.mongodb.net:27017,cluster0-shard-00-02-4iued.mongodb.net:27017/nodestuff?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

var db;

MongoClient.connect(mongoKey, (err, database) => {
  if (err) return console.log(err)
  db = database
  db.collection('albums').remove()
  db.collection('albums').find().toArray((err, results) => {
    if (err) return console.log(err)
    console.log(results)
  })
})
