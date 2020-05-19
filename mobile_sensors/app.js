var  express = require('express');

var accelerometerController = require('./controllers/accelerometerController');

var app = express();

const PORT = process.env.PORT || 3000 

// Set up template engine 
app.set('view engine', 'ejs');

// Set up middleware to render static files
app.use(express.static('./assets'));

//Start controller
accelerometerController(app);

//Listen to port
app.listen(PORT);
console.log(`You are listening to port ${PORT}`);