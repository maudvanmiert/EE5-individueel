// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }

const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Guest = require('../models/guest');
const Account = require('../models/account');
const Step = require('../models/step');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const flashC = require('connect-flash');

// old passport
// const session = require('express-session');
// const initializePassport = require('../passport-config.js');
// initializePassport(
//     passport, 
//     username => accounts.findOne(user => accounts.username === usernamelogin),
//     id => accounts.findById(user => accounts._id === id)
// );




//connect to mongodb
// mongoose.connect('mongodb://localhost/testaroo');

// mongoose.connection.once('open', function(){
//     console.log('Connection succes');
// }).on('error', function(error){
//     console.log('Connection error:', error);
// });

//create a schema - this is like a blueprint
// var accountSchema = new mongoose.Schema({
//     item: String
// });

// var guestSchema = new mongoose.Schema({
//     name: String,
//     lastname: String,
//     birthdate: Date,
//     startdate: Date
// });

// var Account = mongoose.model('Account', accountSchema);
// var itemOne = Account({item: 'Marina'}).save(function(err){
//     if(err)throw err;
//     console.log('item saved jipppie');
// });

// var Guest = mongoose.model('Guest', guestSchema);
// var itemOne = Account({item: 'Marina'}).save(function(err){
//     if(err)throw err;
//     console.log('item saved jipppie');
// });

// var itemThree = Step3({name: 'Afscheid'}).save(function(err){
//     if(err)throw err;
// });

var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){
    
// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(cors())
// app.use(passport.initialize())
// app.use(passport.session())

// app.post('/inloggen', passport.authenticate('local', {
//     successRedirect: '/index',
//     failureRedirect: '/inloggen',
//     failureFlash: true
// }))


// app.post('/accountmaken', urlencodedParser, function(req, res){
//     const today = new Date()
//     const accountData = {
//         username: req.body.username,
//         password: req.body.password,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         created: today
//     }

//     Account.findOne({
//         username: req.body.username
//     })
//         .then(account => {
//             if(!account){
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     accountData.password = hash
//                     Account.create(accountData)
//                         .then(account => {
//                             res.json({status: account.username + 'geregistreerd!'})
//                         })
//                         .catch(err => {
//                             res.send('error: ' + err)
//                         })
//                 })
//             } else {
//                 res.json({error: 'Gebruikersnaam al in gebruik'})
//             }
//         })
//         .catch(err => {
//             res.send('error: ' + err)
//         })
// });

app.post('/accountmaken', urlencodedParser, async function(req, res){
    //get data from the view and add it to mongodb
    var firstName = req.body.firstname;
    console.log(firstName);
    var lastName = req.body.lastname;
    var userName = req.body.username;
    var password = req.body.password;

    var firstnameGuest = req.body.nameG;
    var lastnameGuest = req.body.lastnameG;
    console.log(lastnameGuest);
    var birthdateGuest = req.body.birthdateG;
    console.log(birthdateGuest);

    if(!firstnameGuest && !lastnameGuest && !birthdateGuest) {
    try {
        var hashedPassword = await bcrypt.hash(password, 10);
        var newAccount = Account({firstname: firstName, lastname: lastName, username: userName, password: hashedPassword}).save(function(err,data){
        if(err) throw err;
        res.json(data);
        console.log('nieuw account' + data);
        console.log('nieuw account van ' + data.username);
    });
    } catch (error) {
        console.log('probleem i guess' );
    }} 
    
    else if (!firstName && !lastName && !userName && !password) {
        var date = new Date(birthdateGuest);
        console.log(date);
        var newGuest = Guest({name: firstnameGuest, lastname: lastnameGuest, birthdate: date}).save(function(err,data){
            if(err) throw err;
            res.json(data);
    });}  
    
    else {
        console.log('Help account maken');
    };
});

// app.delete('/collegas/:id', urlencodedParser, function(req, res){
//     Account.findByIdAndRemove(req.params.id)
// });

// router.delete("/:id", function(req, res, next) {
//     Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
//      if (err) return next(err);
//      res.json(post);
//     });
//    });

var user_id = '5ec590cf8a816e7d618b939a'; 


app.delete('/stappen/:item', function(req,res){
    //delete the requested item from mongoDB
    Account.findByIdAndRemove(user_id, function (err, data) { 
        if (err) throw err;
        res.json(data);
    }); 
});


// app.post('/accountmaken', urlencodedParser, function(req, res){
//     //get data from the view and add it to mongodb
//     var newGuest = Guest(req.body).save(function(err,data){
//         if(err) throw err;
//         res.json(data);
//         console.log('nieuwe gast' + data);
//     });
// });


// app.post('/accountmaken', urlencodedParser, function(req, res){
//     //get data from the view and add it to mongodb
//     var newGuest = Guest(req.body).save(function(err,data){
//         if(err) throw err;
//         res.json(data);
//     });
// });
    
// app.delete('/accountmaken/:item', function(req,res){
//     //delete the requested item from mongodb
//     Account.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
//         if (err) throw err;
//         res.json(data);
//     });
// });
app.get('/accountmaken', function(req, res){
    //get data from mongodb and pass it to view
    Account.find({}, function(err,data){
        if(err) throw err;
        res.render('accountmaken', {accounts:data});
    });
});

//ja
app.get('/gasten', function(req, res){
    //get data from mongodb and pass it to view
    Guest.find({}, function(err,data){
        if(err) throw err;
        var period = data.startdate;
        res.render('gasten', {guests:data});
    });
});

//ja
app.get('/collegas', function(req, res){
    //get data from mongodb and pass it to view
    Account.find({}, function(err,data){
        if(err) throw err;
        res.render('collegas', {staff:data});
    });
});

app.get('/detail/:id', function(req, res){
    //get data from mongodb and pass it to view
    Guest.find({}, function(err,data){
        if(err) throw err;
        res.render('collegas', {staff:data});
    });
});

app.get('/collegas', function(req, res){
    //get data from mongodb and pass it to view
    var q = req.query.q;
    Guest.find({firstname: {$regex: new RegExp(q)}}, function(err,data){
        if(err) throw err;
        res.json(data);
    }).limit(10);
});

    
        // Step2.find({}, function(err,data2){
        //     if(err) throw err;
        //     res.render('stappen', {stap2:data2});
        // });
        // Step3.find({}, function(err,data){
        //     if(err) throw err;
        //     res.render('stappen', {stap3:data});
        // });
    
    // app.get('/stappen', function(req, res){
    //     //get data from mongodb and pass it to view
    //     Step2.find({}, function(err,data){
    //         if(err) throw err;
    //         res.render('stappen', {stap2:data});
    //     });
    // });
    // app.get('/stappen', function(req, res){
    //     //get data from mongodb and pass it to view
    //     Step3.find({}, function(err,data){
    //         if(err) throw err;
    //         res.render('stappen', {stap3:data});
    //     });
    // });
}