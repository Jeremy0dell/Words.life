// var db = require('./schema');
// var { User, Entry } = require('./schema'); USE THE HELPERS MODULE
var app = require('./server').app;
var render = require('./render');
var mongoose = require('mongoose');
var port = 3000;
var path = require("path");
var bodyParser = require('body-parser');
var helpers = require('./data/helpers.js')
var session = require('express-session')



// console.log(User, Entry);

var currUser = "";


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname = '/render.js'));

// var User = db.User;
// var Entry = db.Entry;

app.listen(port);

console.log('Server now listening on port ' + port);

app.get('/', function (req, res) {
	// console.log("hello world");
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/toggle', function (req, res) {
  var toSend = helpers.showUserEntries(currUser); // look into responses
  res.status(200);
  res.send(toSend);
});

app.post('/entry', function(req, res) {
  // console.log('Doing a post: ', req.body);
  // console.log('currUser: ', currUser);

  var posted = helpers.createEntry(req.body.title, req.body.entry, currUser);
  helpers.addToUser(currUser, posted);
  // helpers.showCollection();
});

app.post('/auth', function(req, res) {
  console.log('Logging in: ', req.body);
  currUser = req.body.uname;
  helpers.createUser(req.body.uname, req.body.psw);
});


