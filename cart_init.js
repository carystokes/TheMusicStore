var MongoClient = require('mongodb').MongoClient;
var environment = require('./.env')

var albums = [{'id': 17, 'name': 'Way Out Here', 'artist': 'Josh Thompson', 'price': 39.99, 'photo': 'images/11.png'}, {'id': 18, 'name': 'The Pines', 'artist': 'Tremolo', 'price': 39.99, 'photo': 'images/14.png'}, {'id': 19, 'name': 'Live from Freedom Hall', 'artist': 'Lynyrd Skynyrd', 'price': 39.99, 'photo': 'images/15.png'}, {'id': 20, 'name': 'Achin and Shakin', 'artist': 'LauraBell Bundy', 'price': 39.99, 'photo': 'images/18.png'}, {'id': 21, 'name': 'Here I Am', 'artist': 'Marvin Sapp', 'price': 39.99, 'photo': 'images/17.png'}, {'id': 22, 'name': 'Just James', 'artist': 'J Moss', 'price': 39.99, 'photo': 'images/16.png'}]

var mongoKey = 'mongodb://' + MONGO_USERNAME + ':' + MONGO_PASSWORD + '@cluster0-shard-00-00-4iued.mongodb.net:27017,cluster0-shard-00-01-4iued.mongodb.net:27017,cluster0-shard-00-02-4iued.mongodb.net:27017/nodestuff?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

var db;

MongoClient.connect(mongoKey, (err, database) => {
  if (err) return console.log(err)
  db = database
  for (i = 0; i < albums.length; i++) {
    db.collection('albums').save(albums[i])
  }
  db.collection('albums').find().toArray((err, results) => {
    if (err) return console.log(err)
    console.log(results)
  })
})
