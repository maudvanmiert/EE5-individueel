const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.guest = require('./guest');
db.account = require('./account');

module.exports = db;
