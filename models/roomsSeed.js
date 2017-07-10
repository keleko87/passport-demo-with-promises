const Room = require('./Room');
const User = require('./User');
const mongoose = require('mongoose');
const {dbURL} = require('./db');
// igual a
// const dbURL = require('./db').dbURL;
var path = require('path');
var debug = require('debug')('passport-demo:'+path.basename(__filename));

mongoose.connect(dbURL)
.then(() => {
  console.log("Connected to DB");
  return User.findOne({}).exec();
})
.then(user => {
  let names = ['Pato Donald', 'Mickey Mouse', 'Shrek', 'Minions', 'Pluto'];
  return Promise.all(names.map( name => {
    return new Room({
      title:name,
      owner:user._id,
    }).save();
  }));
})
.then(rooms => rooms.forEach(r => console.log(`Created Room ${r._id}`)))
.catch(err => console.log(err));
