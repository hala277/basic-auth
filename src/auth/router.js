'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// const base64 = require('base-64');
// const { app } = require('../server.js');

const {User} = require('./models/users-model.js');
const signInAuth = require('./middleware/basic.js');
// const { app } = require('../server.js');



// Routes
router.post('/signup', signupFunc);
router.post('/signin',signInAuth,signInFunc)

async function signupFunc(request,response) {
let {username,password} = request.body;
console.log(`${username} and ${password}`);

try{
let hashedPassword = await bcrypt.hash(password,5);
console.log('after hashing -->',hashedPassword)
const newUser = await Users.create({
    username:username,
    password:hashedPassword
})
response.status(201).json(newUser);

}
catch(error) {
    response.status(403)
    console.log(error);
}
}

async function signInFunc(request,response){
    response.status(200).json(request.Users);
}

module.exports = router;
