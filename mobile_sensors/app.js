var  express = require('express');
var accelerometerController = require('./controllers/accelerometerController');

var app = express();

const PORT = process.env.PORT || 3000

// set up template engine 
app.set('view engine', 'ejs');

// static files
app.use(express.static('./assets'));

//fire controller
accelerometerController(app);

//listen to port
app.listen(PORT);
console.log(`You are listening to port ${PORT}`);