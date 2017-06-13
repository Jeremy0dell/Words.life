var User = require('./schema').User;
var Entry = require('./schema').Entry;

// console.log('~~~~~~~~~~~~~~~~~~USER', User, Entry)
module.exports.createUser = function(user, pass) {
  var newUser = new User({username: user, password: pass});
  newUser.save();
};

module.exports.createEntry = function(title, text, username) {
  // console.log(Entry);
  var newEntry = new Entry({title: title, text:text, author: username});
  // newEntry.save();
  return newEntry;
};

module.exports.addToUser = function(user, entry) {
  var that = this;


  User.findOne({ 'username': user }, function (err, user) {
    if (err) throw err;
  }).updateOne({
    "$push": { "entries": that.createEntry(entry.title, entry.text, user.username) }
  }).exec(function(err, user) {
    entry.save();
  })

  User.update({ 'username': user }, { $inc: { score: 1 }}, function(err, data) {
    // console.log('this is a try', data)
  });
  console.log("entry is: ", entry);
  // User.findOne({ 'username': user }, function (err, user) {
  //   console.log('lllp', user);
  //   if (err) throw err;
  // }).updateOne({
  //   "$inc": { "score": 1}
  // })

  User.find({}, 'username score', function(err, data) {
    console.log(data.toString());
  })
};



module.exports.showCollection = function() {
  console.log('Users: ');
  User.find({}, function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  console.log('Entries: ');
  Entry.find({}, function( err, result) {
    if (err) throw err;
    console.log(result);
  });
};

module.exports.showUserEntries = function(user) {
  User.findOne({ 'username': user }, function (err, person) {
    if (err) throw err;
  }).exec(function(err, data) {
    (data.entries).forEach(function(chunk) {
      console.log('\nTitle: ', chunk.title, '\nText: ', chunk.text);
    });
  });
};