var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('VICTORY');
});

var userSchema = mongoose.Schema({
  username: {type: String, index: {unique: true}}, // make required
  password: {type: String}, // make required
  entries: [Object],
  score: Number
});

var User = mongoose.model('User', userSchema);

var entrySchema = mongoose.Schema({
  title: String,
  text: String
});

var Link = mongoose.model('Entry', entrySchema);

module.exports = {User, Link}