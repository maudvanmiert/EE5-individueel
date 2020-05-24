const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/testaroo');

// mongoose.connection.once('open', function(){
//     console.log('Connection succes testaroo');
// }).on('error', function(error){
//     console.log('Connection error:', error);
// });

var accountSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    // password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    created: {type: Date, default: Date.now},
    birthday: {type: Date}
});

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;