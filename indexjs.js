var express = require('express');
var stepsController = require('./controllers/stepsController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//fire controllers
stepsController(app);

// listen to port
app.listen(3000);
console.log('You are listening to port 3000');