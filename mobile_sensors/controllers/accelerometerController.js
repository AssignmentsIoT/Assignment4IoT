// This is the accelerometer controller. It also manages the HTTP requests.

var thingsboardClient = require("./../app");

// Manage HTTP request to the app
module.exports = function(app) {
    
    // Catch GET request 
    app.get('/', function(req, res) {
        // Render the view
        res.render('index');
    });

    // Manage POST request
    app.post('/', function(req, res) {

        // Collect data
        var data = JSON.stringify(req.body);
        console.log("POST received. Data: " + data);

        // Publish data on ThingsBoard topic (data arrives to the device we connected to, the accelerometer)
        thingsboardClient.publish('v1/devices/me/telemetry', data);
        console.log("Data published on ThingsBoard");
    })

}