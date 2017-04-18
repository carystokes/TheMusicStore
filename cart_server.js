var express = require('express');
var index = require('./routes.index');
var customers = require('./routes/customers');
var orders = require('./routes/orders');
var products = require('./routes/products');

var cart_server = express();

cart_server.use('/', index);
cart_server.use('/products', products);
cart_server.use('/orders', orders);
cart_server.use('/customers', customers);

module.exports = cart_server

// var http = require('http');
// var fs = require('fs');
// var url = require('url');
//
// function handle_incoming_request(req, res) {
//   if (/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())) {
//     sendFileContent(res, req.url.toString().substring(1), "text/css")
//   } else if (/^\/[a-zA-Z0-9\/]*.png$/.test(req.url.toString())) {
//     sendImage(res, req.url.toString().substring(1), "image/png")
//   } else {
//     sendPage(req, res)
//   }
//
//   function sendFileContent(res, fileName, contentType){
//     fs.readFile(fileName, function(err, data){
//       if(err){
//         res.writeHead(404);
//         res.write("File not found");
//         res.end();
//       }
//       else{
//         res.writeHead(200, {'Content-Type': contentType});
//         res.end(data);
//       }
//     });
//   }
//
//   function sendImage(res, fileName, contentType){
//     fs.readFile(fileName, function(err, img){
//       if(err){
//         res.writeHead(404);
//         res.write("File not found");
//         res.end();
//       }
//       else{
//         res.writeHead(200, {'Content-Type': contentType});
//         res.end(img, 'binary');
//       }
//     });
//   }
//
//   function sendPage(req, res) {
//     fs.readFile("./views/shopping.html", function(err, data){
//       if(err){
//         res.writeHead(404);
//         res.write("File not found");
//         res.end();
//       }
//       else{
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data);
//       }
//     });
//   }
// }
//
// var s = http.createServer(handle_incoming_request);
// s.listen(8080);
