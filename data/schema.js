var mongoose = require('mongoose');
// mongoose.createConnection('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('VICTORY');
// });

var userSchema = new mongoose.Schema({
  username: {type: String, index: {unique: true}}, // make required
  password: {type: String}, // make required
  entries: [],
  score: { type: Number, default: 1 }
});


var entrySchema = new mongoose.Schema()

entrySchema.add({
  title: String,
  text: String,
  author: String
});

var Entry = mongoose.model('Entry', entrySchema);
var User = mongoose.model('User', userSchema);

module.exports = { User: User, Entry: Entry }