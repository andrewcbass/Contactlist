'use strict';

const PORT = 12345;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

//load page
app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');

  res.sendFile(indexPath);
})

//load existing contacts into page
app.get('/contacts', function(req, res) {
  fs.readFile('./contacts.json', function(err, data) {
    var contacts = JSON.parse(data);
    console.log('contacts sent from JSON');
    res.send(contacts);
  });
});

//write new contact into JSON file
app.post('/contacts', function(req, res) {
  fs.readFile('./contacts.json', function(err, data) {
    var contacts = JSON.parse(data);
    contacts.push(req.body);

    fs.writeFile('./contacts.json', JSON.stringify(contacts), function(err) {
      console.log('new contact added successfuly');

      res.send();
    });
  });
});

//edit contact, runs after saving from modal


//delete contact from JSON file
app.delete('/contacts/:index', function(req, res) {

  fs.readFile('./contacts.json', function(err, data) {
    var contacts = JSON.parse(data);
    console.log('REQ.parmsr', req.params);
    contacts.splice(req.params.index, 1);

    fs.writeFile('./contacts.json', JSON.stringify(contacts), function(err) {
      console.log('contact edited successfuly')

      res.send();
    });
  });
});


var server = http.createServer(app);

server.listen(PORT, function() {
  console.log(`hello from the other side ${PORT}`);
})
