var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var app = express();
var stepsController = require('./controllers/stepsController.js');
var accountController = require('./controllers/accountController.js');

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

//anders worden de css dingen niet gebruikt (middleware denk ik)
//app.use('/assets', express.static('assets'));
app.use(express.static('./'));

const db = require("./models");

// mongoose.connect('mongodb://localhost/testaroo');

// mongoose.connection.once('open', function(){
//     console.log('Connection succes testaroo in app.js');
// }).on('error', function(error){
//     console.log('Connection error:', error);
// });

mongoose.connect('mongodb://localhost/deSpiegel');

mongoose.connection.once('open', function(){
    console.log('Connection succes deSpiegel in app.js');
}).on('error', function(error){
    console.log('Connection error:', error);
});



// var corsOptions = {
//     origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
 var flash = require('connect-flash');
 app.use(flash());
 
 // Initialize Passport
 var initPassport = require('./passport/init');
 initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

 /// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

stepsController(app, passport);
accountController(app, passport);




// app.get('/', function(req, res){
//     res.render('inloggen.ejs');
// });

// app.get('/index', function(req, res){
//     res.render('index', {name:'Maud'});
// });

// app.get('/home', function(req, res){
//     res.render('index', {name:'Maud'});
// });

// app.get('/detail', function(req, res){
//     res.render('detail',{name:'Maud'});
// });


// app.get('/gasten/:name', function(req, res){
//     var data = {age: 29, job: 'ninja', hobbies: ['eating', 'coding', 'sleeping']};
//     res.render('gasten', {person: req.params.name, data: data});
// });

// app.get('/gasten', function(req, res){
//     var data = {age: '-', job: '-', hobbies: ['-', '-', '-']};
//     res.render('gasten', {person: 'Overzicht', data: data});
// });

// app.get('/inloggen', function(req, res){
//     res.render('login');
// });

// app.get('/collegas', function(req, res){
//     res.render('collegas');
// });

// app.get('/stappen', function(req, res){
//     res.render('stappen');
// });

// app.get('/dagplanning', function(req, res){
//     res.render('dagplanning');
// });

// app.get('/onderhoudstaken', function(req, res){
//     res.render('onderhoudstaken');
// });

// app.get('/accountmaken', function(req, res){
//     res.render('accountmaken', {qs:req.query});
// });

// app.post('/accountmaken', urlencodedParser, function(req, res){
//     console.log(req.body);
//     res.render('accountmaken-succes', {data: req.body});
// });

app.listen(3000);


















// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res){
//     console.log('request was made:' + req.url);
//     if(req.url === '/home' || req.url === '/'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream(__dirname + '/index.html').pipe(res);
//     } else if (req.url === '/steps'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream(__dirname + '/steps.html').pipe(res);
//     } else{
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream(__dirname + '/404.html').pipe(res);
//     }

// });

// server.listen(3000, '127.0.0.1');
// console.log('Listening on port 3000'); 
