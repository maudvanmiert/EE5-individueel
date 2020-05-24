const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Guest = require('../models/guest');
const Account = require('../models/account');
const Step = require('../models/step');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){


app.get('/stappen', function(req, res){
    //get data from mongodb and pass it to view
    Step.find({position: '1'}, function(err,data1){
        Step.find({position: '2'}, function(err,data2){
            Step.find({position: '3'}, function(err,data3){
                if(err) throw err;
                // console.log(data1 + data2);
                //data moet hier gefilterd worden met position
                res.render('stappen', {stap1:data1, stap2:data2,stap3:data3});
            });
        });
    });
});

app.post('/stappen', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var nameStep1 = req.body.name1;
    var nameStep2 = req.body.name2;
    var nameStep3 = req.body.name3;
    var positionStep1 = req.body.position1;
    var positionStep2 = req.body.position2;
    var positionStep3 = req.body.position3;
    // var nameStep3 = req.body.name3;
    console.log(nameStep1);
    if(!nameStep2 && !nameStep3) {
    var newStap1 = Step({name: nameStep1, position: positionStep1}).save(function(err1,data1){
        if(err1) throw err1;
        res.json(data1);
    });}

    else if(!nameStep1 && !nameStep3) {
    var newStap2 = Step({name: nameStep2, position: positionStep2}).save(function(err2,data2){
        if(err2) throw err2;
        res.json(data2);
    });}

    else if(!nameStep1 && !nameStep2) {
    var newStap3 = Step({name: nameStep3, position: positionStep3}).save(function(err3,data3){
        if(err3) throw err3;
        res.json(data3);
    });}

    else{console.log('Help step maken')};
});

app.delete('/stappen/:item', function(req,res){
    //delete the requested item from mongoDB
    Step.find({name: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    })
});
}