var  express = require('express');
var bodyParser = require('body-parser');

var accelerometerController = require('./controllers/accelerometerController');

var app = express();

const PORT = process.env.PORT || 3000 

// Set up template engine 
app.set('view engine', 'ejs');

// Set up middleware to render static files
app.use(express.static('./assets'));

// JSON parser for POST request
app.use(bodyParser.json());

//Start controller
accelerometerController(app);

//Listen to port
app.listen(PORT);
console.log(`You are listening to port ${PORT}`);