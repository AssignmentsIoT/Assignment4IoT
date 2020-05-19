// This is the accelerometer controller. It also manages the HTTP requests.

var bodyParser = require('body-parser');

module.exports = function(app) {
    
    // Catch GET request 
    app.get('/', function(req, res) {
        // Render the view
        res.render('index');
    });

    app.post('/', bodyParser.json, function(req, res) {
        var data = JSON.stringify(req.body);
        console.log("POST received. Data: " + data);
    })

}