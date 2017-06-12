var db = require('./app');
var app = require('./server').app;
var mongoose = require('mongoose');
var port = 3000;

var User = db.User;
var Entry = db.Entry;

app.listen(port);

console.log('Server now listening on port ' + port);

app.get('/', function (req, res) {
	console.log(req.method, res);
  res.send('Hello World!')
})

// var ho = new User({username: "hello2", password: "world2", score: 45}).save();

User.collection.drop();

User.find({}, function (err, person) {
  if (err) return handleError(err);
  console.log('hello', person)
})