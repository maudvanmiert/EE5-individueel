const assert = require('assert');
const Guest = require('../models/guest');

describe('Saving records', function(){
    it('Save guest to db', function(done){
        var person = new Guest({
            name: 'Maud',
            lastname: 'Van Miert',
            birthdate: '2',
            startdate: '6' 
        });
        person.save().then(function(){
            assert(person.isNew === false);
            done();
        });
    });
});