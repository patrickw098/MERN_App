const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const images = require('./routes/api/images');
const locations = require('./routes/api/locations');

mongoose
    .connect(db)
    .then(() => console.log("Successfully connected to Mongoose"))
    .catch(err => console.log(err));


// Begin Middleware
const app = express();


//Middleware for bodyParser

app.use(bodyParser.urlencoded({ extended: false })) // don't need to parse the json object deeply.
app.use(bodyParser.json()); // parses json.

app.get('/', (req, res) => res.send("Hello World"));

// Begin Routes
app.use('/api/users', users);
app.use('/api/images', images);
app.use('/api/locations', locations); //just trying to see if i can save location
app.get('*', function (req, res) {
    res.status(404).send("error 404");
});



const port = process.env.PORT || 8000; //runs on port in production, or 8000 on localhost.

app.listen(port, () => console.log(`Server is listening on port:${port}`)); 