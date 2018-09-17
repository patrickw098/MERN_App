const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

// Routes
const users = require('./routes/api/users');
const images = require('./routes/api/images');

mongoose
    .connect(db)
    .then(() => console.log("Successfully connected to Mongoose"))
    .catch(err => console.log(err));


// Begin Middleware
const app = express();

//Middleware for bodyParser
app.use(bodyParser.urlencoded({ extended: false })) // don't need to parse the json object deeply.
app.use(bodyParser.json()); // parses json.

// Use Passport
app.use(passport.initialize());
require("./passport")(passport);

app.get('/', (req, res) => res.send("Hello World"));

// Begin Routes
app.use('/api/users', users);
app.use('/api/images', images);
app.get('*', function (req, res) {
    res.status(404).send("error 404");
});





const port = process.env.PORT || 8000; //runs on port in production, or 8000 on localhost.

app.listen(port, () => console.log(`Server is listening on port:${port}`)); 