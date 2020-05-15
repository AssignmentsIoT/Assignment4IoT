module.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.render('index');
    });

    /*
    app.post('/', function(req,res) {

        accelerometer data to elaborate / send to ThingsBoard

    });
    */
}