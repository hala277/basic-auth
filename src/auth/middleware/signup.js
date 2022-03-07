'use strict';

const bcrypt = require('bcrypt'); 
const {User} = require('../models/users-model'); 

const signUp = async (request,response,next) => {
    let {username,password} = request.body;
    console.log(`username:${username} and password:${password}`);
    
    try{
    let hashedPassword = await bcrypt.hash(password,5);
    console.log('after hashing -->',hashedPassword)
    const newUser = await User.create({
        username:username,
        password:hashedPassword
    })
    
    response.status(201).json(newUser);
    // next();
    
    }
    catch(error) {
        response.status(403)
        console.log(error);
    }
    next();
}

module.exports = signUp;