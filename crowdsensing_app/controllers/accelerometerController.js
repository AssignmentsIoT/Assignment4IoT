// This is the accelerometer controller. It also manages the HTTP requests.

// Set up MQTT to send data to ThingsBoard
var mqtt = require('mqtt');

// ThingsBoard host
const thingsboardHost = "demo.thingsboard.io";

// Access token to connect to the Accelerometer device on ThingsBoard (stored in an config variable on Heroku)
const accessToken = process.env.TS_ACCESS_TOKEN;

// Log
console.log("Connecting to: %s using accelerometer access token.", thingsboardHost);

// Creating ThingsBoard client and connecting to the accelerometer with its access token
var thingsboardClient = mqtt.connect('mqtt://'+thingsboardHost, {username: accessToken});

// Log
thingsboardClient.on("connect", function() {
    console.log("Connection to ThingsBoard established");
});

// Manage HTTP request to the app
module.exports = function(app) {
    
    // Catch GET / request 
    app.get('/', function(req, res) {
        // Render the cloud home view
        res.render('cloud');
    });

    // Manage POST / request
    app.post('/', function(req, res) {
        // Send data to ThingsBoard to process at cloud level
        sendData(req.body, "Cloud");
    });

    // Catch GET /edge request
    app.get('/edge', function(req, res) {
        // Render the edge page
        res.render('edge');
    });

    // Manage POST /edge request
    app.post('/edge', function(req, res) {
        // Send data already processed to ThingsBoard
        sendData(req.body, "Edge");
    });

    function sendData(body, level) {

        // Get the data sent with the POST and parse it as a JSON
        var data = JSON.stringify(body);
        console.log("[" + level + "]: POST received. Data: " + data);

        // Publish data on ThingsBoard topic (data arrives to the device we connected to, the accelerometer)
        thingsboardClient.publish('v1/devices/me/telemetry', data);
        console.log("[" + level +"]: Data published on ThingsBoard");
    }

}