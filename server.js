//mongodb
require('./config/db')

var express = require('express')
var app = express()
const port = 3000;

var router = express.Router()

const UserRouter = require('./api/User')

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`); 
})



