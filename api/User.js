const express = require('express');
const router = express.Router();

// mongdb user model
const User = require("./../models/User")

// Passwort Handler
const bcrypt = require('bcrypt');
// Signup
router.post('/signup', (req, res) => {
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if ( name == "" || email == "" | password == "" | dateOfBirth == ""){
        res.json({
            status: "Failed",
            message: "Empty input fields!"
        });
    }

    //else if (!/^[a-zA-Z]*$/.test(name)){
    else if (/^[a-zA-Z]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid Email!"
        })
    }
    else if ( !new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid Date of Birth!"
        })
    }
    else if (password.length < 4){
        res.json({
            status: "FAILED",
            message: "Password too short!"
        })
    }
    else {
        // Checkin inf user already exists
        User.find({email}).then(result => {
            if (result.length){
                res.json({
                    status: "FAILED",
                    message: "User already exists"
                })
            }
            else{
                //password handling
                const saltRound = 10;
                bcrypt.hash(password, saltRound).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "User created",
                            data: result,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "Error account setup"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error with the password"
                    })
                })
            }

        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user"
            })
        })
    }
})

//Signin
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" | password == "" ){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }
    else {
        User.find({email})
        .then(data => {
            if (data.length){
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        res.json({
                            status: "SUCCESS",
                            message: "Logged in successfull",
                            data: data,
                        })
                    }
                    else {
                        res.json({
                            status: "FAILED",
                            message: "Wrong user credentials!"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "There was an error while comparring the passwords"
                    })
                })
            }
        })
    }

})

module.exports = router;