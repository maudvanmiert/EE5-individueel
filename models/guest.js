const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/deSpiegel');

// mongoose.connection.once('open', function(){
//     console.log('Connection succes deSpiegel');
// }).on('error', function(error){
//     console.log('Connection error:', error);
// });

const guestSchema = new Schema({
    name: String,
    lastname: String,
    birthdate: {type: Date},
    startdate: {type: Date, default: Date.now},
    yellowcard: {type: Boolean, default: false},
    //progress: {type: Map<String,Boolean>, 
    //completed: {type: Boolean, default: false},
    progress: [{
        completed: {type: Boolean, default: false},
        step: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Steps'
        }
    }]
});

const Guest = mongoose.model('guests', guestSchema);

module.exports = Guest;