// This is the accelerometer controller. It also manages the HTTP requests.

// Set up MQTT to send data to ThingsBoard
var mqtt = require('mqtt');

const thingsboardHost = "demo.thingsboard.io";

const accessToken = process.env.TS_ACCESS_TOKEN;

console.log("Connecting to: %s using accelerometer access token %s", thingsboardHost, accessToken);

var thingsboardClient = mqtt.connect('mqtt://'+thingsboardHost, {username: accessToken});

thingsboardClient.on("connect", function() {
    console.log("Connection to ThingsBoard established");
});

module.exports = function(app) {
    
    // Catch GET request 
    app.get('/', function(req, res) {
        // Render the view
        res.render('index');
    });

    // Manage POST request
    app.post('/', function(req, res) {
        var data = JSON.stringify(req.body);
        console.log("POST received. Data: " + data);
        thingsboardClient.publish('v1/devices/me/telemetry', data);
        console.log("Data published on ThingsBoard");
    })

}