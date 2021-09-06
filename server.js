//mongodb
require('./config/db')

var express = require('express')
var cors = require('cors')
var app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, DELETE, HEAD, OPTIONS")
    next();
  });
const port = process.env.PORT || 3000;

var router = express.Router()



const UserRouter = require('./api/User')
const EventRouter = require('./api/Veranstaltung')

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter)
app.use('/event', EventRouter)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`); 
})



