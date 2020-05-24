// var LocalStrategy   = require('passport-local').Strategy;
// var Account = require('../models/account');
// var bCrypt = require('bcrypt-nodejs');

// module.exports = function(passport){

// 	passport.use('signup', new LocalStrategy({
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, username, password, done) {

//             findOrCreateUser = function(){
//                 // find a user in Mongo with provided username
//                 Account.findOne({ 'username' :  username }, function(err, user) {
//                     // In case of any error, return using the done method
//                     if (err){
//                         console.log('Error in SignUp: '+err);
//                         return done(err);
//                     }
//                     // already exists
//                     if (user) {
//                         console.log('User already exists with username: '+username);
//                         return done(null, false, req.flash('message','User Already Exists'));
//                     } else {
//                         // if there is no user with that email
//                         // create the user
//                         var newAccount = new Account();

//                         // set the user's local credentials
//                         newAccount.username = username;
//                         newAccount.password = createHash(password);
//                         newAccount.birthday = req.param('birthDay');
//                         newAccount.firstname = req.param('firstName');
//                         newAccount.lastname = req.param('lastName');

//                         // save the user
//                         newAccount.save(function(err) {
//                             if (err){
//                                 console.log('Error in Saving user: '+err);  
//                                 throw err;  
//                             }
//                             console.log('User Registration succesful');    
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//             };
//             // Delay the execution of findOrCreateUser and execute the method
//             // in the next tick of the event loop
//             process.nextTick(findOrCreateUser);
//         })
//     );

//     // Generates hash using bCrypt
//     var createHash = function(password){
//         return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
//     }

// }