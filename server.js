//mongodb
require('./config/db')

var express = require('express')
var app = express()
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



