var  express = require('express');
var bodyParser = require('body-parser');

var accelerometerController = require('./controllers/accelerometerController');

var app = express();

const PORT = process.env.PORT || 3000 

// Set up template engine 
app.set('view engine', 'ejs');

// Set up middleware to render static files
app.use(express.static('./assets'));

// Use JSON parser to handle POST data
app.use(bodyParser.json());

// Set up MQTT to send data to ThingsBoard
var mqtt = require('mqtt');

// ThingsBoard host
const thingsboardHost = "demo.thingsboard.io";

// Access token to connect to the Accelerometer device on ThingsBoard (stored in an config variable on Heroku)
const accessToken = process.env.TS_ACCESS_TOKEN;

// Log
console.log("Connecting to: %s using accelerometer access token %s", thingsboardHost, accessToken);

// Creating ThingsBoard client and connecting to the accelerometer
var thingsboardClient = mqtt.connect('mqtt://'+thingsboardHost, {username: accessToken});

// Log
thingsboardClient.on("connect", function() {
    console.log("Connection to ThingsBoard established");
});

//Start controller
accelerometerController(app);

//Listen to port
app.listen(PORT);
console.log(`You are listening to port ${PORT}`);

module.exports = thingsboardClient;