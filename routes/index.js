var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var moment = require('moment');
const bcrypt = require('bcrypt');
var Step = require('../models/step');
var Account = require('../models/account');
var Guest = require('../models/guest');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/inloggen', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.post('/accountmaken', urlencodedParser, async function(req, res){
		//get data from the view and add it to mongodb
		var firstName = req.body.firstname;
		console.log(firstName);
		var lastName = req.body.lastname;
		var userName = req.body.username;
		var password = req.body.password;
		var hashedPassword = createHash(password);
	
		var firstnameGuest = req.body.nameG;
		var lastnameGuest = req.body.lastnameG;
		console.log(lastnameGuest);
		var birthdateGuest = req.body.birthdateG;
		console.log(birthdateGuest);
	
		if(!firstnameGuest && !lastnameGuest && !birthdateGuest) {
		try {
			//var hashedPassword = await bcrypt.hash(password, 10);

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

	// Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }


	/* GET Home Page */
	router.get('/index', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
    });
    

	// Gasten
	router.get('/gasten', isAuthenticated, function(req, res){
		//get data from mongodb and pass it to view
		Guest.find({}, function(err,data){
			if(err) throw err;
			data.forEach(gast => gast.opname = moment(gast.startdate).locale("nl").format("D MMMM YYYY"));
			
			res.render('gasten', {
				guests:data, 
				sKey: "" 
				// periodtillBirthday: `${period} ${dagen}`
			});
		});
	});

	router.post('/gasten/filtered', function(req, res){
		//get data from mongodb and pass it to view
		Guest.find({}, function(err,data){
			if(err) throw err;
			data.forEach(gast => gast.opname = moment(gast.startdate).locale("nl").format("D MMMM YYYY"));
			var searchkey = req.body.item.toLowerCase();
			res.render('gasten',{guests: data.filter(d => d.name.toLowerCase().includes(searchkey)), sKey: searchkey});
		});
	});
    

	router.get('/collegas', isAuthenticated, function(req, res){
		//get data from mongodb and pass it to view
		Account.find({}, function(err,data){
			if(err) throw err;
			res.render('collegas', {staff:data, sKey: ""});
		});
	});

	router.post('/collegas/filtered', function(req, res){
		//get data from mongodb and pass it to view
		Account.find({}, function(err,data){
			if(err) throw err;
			var searchkey = req.body.item.toLowerCase();
			res.render('collegas',{staff: data.filter(d => d.firstname.toLowerCase().includes(searchkey)), sKey: searchkey});
		});
	});

	router.post('/collegas/delete', function(req, res){
		//get data from mongodb and pass it to view
		Account.deleteOne({_id : req.body.id}, function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});
    
	
	// Stappen
	router.get('/stappen', isAuthenticated, function(req, res){
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

	router.post('/stappen', urlencodedParser, function(req, res){
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
	
	router.delete('/stappen/:item', function(req,res){
		//delete the requested item from mongoDB
		Step.find({name: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
		})
	});

	// Home
    router.get('/home', isAuthenticated,function(req, res){
        res.render('index', {
			firstname:req.user.firstname, 
			lastname:req.user.lastname, 
			username:req.user.username,
			password:req.user.password
		});
	});
	
	
	router.post('/home', urlencodedParser, function(req, res){
		//get data from the view and add it to mongodb
		var newpassword = req.body.newpassword;
		var newpasswordhashed = createHash(newpassword);
		var oldpassword = req.user.password;
		user.setPassword(newpasswordhashed, function(err) {
			if(err) {
					if(err.name === 'IncorrectPasswordError'){
						res.json({ success: false, message: 'Incorrect password' }); // Return error
					}else {
						res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
					}
		}
		});
	});

	var dagOfDagen = function(number){
		if(number === 1){
			return 'dag';
		} else return 'dagen';
    }

    router.get('/detail/:pid', isAuthenticated, function(req, res){
		Guest.findOne({_id: req.params.pid}, function(err,guest){
			if(err) throw err;
			// check all tasks
			Step.find({$or:[{position: "1"},{position:"2"},{position:"3"}]}, function(err2, steps){
				if(err2) throw err2;
			
				var formattedBirthday = moment(guest.birthdate).locale("nl").format("D MMMM YYYY");  
				var formattedStartdate = moment(guest.startdate).locale("nl").format("D MMMM YYYY");  
				
				var period = Math.floor(( new Date() - guest.startdate ) / (1000 * 60 * 60 * 24));
				var dagen = dagOfDagen(period);
				
				// defaults = reeds gepasseerd (lager geleden dan 21 dagen)
				var daystilldoctor8 = 'Reeds gepasseerd';
				var daystilldoctor21 = 'Reeds gepasseerd';
				var dagen8 = '';
				var dagen21 = '';
				if (period < 8){
					daystilldoctor8 = 8 - period;
					dagen8 = dagOfDagen(daystilldoctor8);
					daystilldoctor21 = 21 - period;
					dagen21 = dagOfDagen(daystilldoctor21);
				} else if (period === 8){
					daystilldoctor8 = 'Vandaag';
					daystilldoctor21 = 21 - period;
					dagen21 = dagOfDagen(daystilldoctor21);
				} else if (period < 21){
					daystilldoctor21 = 21 - period;
					dagen21 = dagOfDagen(daystilldoctor21);
				} else if (period === 21){
					daystilldoctor21 = 'Vandaag';
				}

				const getStatus = (stepId) => {
					const entry = guest.progress.find(s => `${s.step}` === `${stepId}`);
					return entry ? entry.completed : false;
				};

				// configureer taken
				const taken1 = steps.filter(s => s.position === '1').map(s => (
					{	name: s.name,
						completed: getStatus(s.id),
						id: s.id
					}));
				const taken2 = steps.filter(s => s.position === '2').map(s => (
					{	name: s.name,
						completed: getStatus(s.id),
						id: s.id
					}));
				const taken3 = steps.filter(s => s.position === '3').map(s => (
					{	name: s.name,
						completed: getStatus(s.id),
						id: s.id
					}));
			
				res.render('detail',{
					idGuest: guest._id,
					nameGuest: guest.name,
					lastnameGuest:guest.lastname,
					birthdateGuest:formattedBirthday,
					startdateGuest:formattedStartdate,
					yellowcardGuest: guest.yellowcard? 'Ja' : 'Nee',
					yellowcard: guest.yellowcard,
					period: `${period} ${dagen}`,
					days8: `${daystilldoctor8} ${dagen8}`,
					days21: `${daystilldoctor21} ${dagen21}`,
					steps: [taken1, taken2, taken3]
				});
			});
		});
	});

	router.post('/detail/flag', function(req, res){
		//if(err) throw err;
		var yellow = req.body.yellowCard;
		Guest.updateOne(
			{ _id :  req.body.id}, // specifies the document to update
			{
				$set: {  yellowcard : yellow }
			}, function(err, ans){
			if(err) throw err;
			res.json(ans);
			}
		);
	});

	router.post('/detail/delete', function(req, res){
		Guest.deleteOne(
			{ _id :  req.body.id}
		    , function(err, ans){
			if(err) throw err;
			res.json(ans);
			}
		);
	});

	router.post('/detail/step', function(req, res){
		//if(err) throw err;
		console.log('getting update request' + JSON.stringify(req.body));
		Guest.updateOne(
			{ _id :  req.body.person}, // specifies the document to update
			{
				$pull: {  "progress" : {step: req.body.step}}		// update array with value..
			}, function(err, ans){
			if(err) throw err;
			Guest.updateOne(
				{ _id :  req.body.person}, // specifies the document to update
				{
					$push: {  "progress" : {step: req.body.step, completed: req.body.value}}		// update array with value..
				}, function(err2, answ){
				if(err2) throw err2;
				console.log(`request ${JSON.stringify(answ)} for step ${req.body.step}`);
				res.json(answ);
			});
		});
	});

	router.get('/accountmaken', isAuthenticated,  function(req, res){
        Account.find({}, function(err,data){
			if(err) throw err;
			res.render('accountmaken', {accounts:data});
		});
    });

	return router;
}





