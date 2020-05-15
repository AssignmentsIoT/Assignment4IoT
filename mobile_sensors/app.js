var  express = require('express');
var accelerometerController = require('./controllers/accelerometerController');

var app = express();

// set up template engine 
app.set('view engine', 'ejs');

// static files
app.use(express.static('./assets'));

//fire controller
accelerometerController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');