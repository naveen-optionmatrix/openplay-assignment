const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require('http-errors');

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

const db = require("./models");

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Open Play's assignment." });
});

// Mapping the routes of the application
const routes = require('./routes/index')
app.use('/api', routes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
 });
 
 // error handler
 app.use(function (err, req, res, next) {
   console.error(err.message); // Log error message in our server's console
   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
 });