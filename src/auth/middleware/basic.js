'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
// const User = require('../models/users-model.js');
const {User} = require('../models/users-model');


const signIn = async (request, response, next) => {

    if (request.headers['authorization']) {
        let basicHeaderParts = request.headers.authorization.split(' ');
        console.log('basicHeaderParts --> ', basicHeaderParts);

        // to encode(username:password)
        let encodePart = basicHeaderParts.pop();
        console.log('encodePart --> ', encodePart);

        // to decode
        let decode =  base64.decode(encodePart); //username:password
        console.log('decode --> ', decode);
        let [username, password] = decode.split(':'); //[username:password]

        try {
            const user = await User.findOne({ where:{ username: username } });
            const valid = await bcrypt.compare(password, user.password);

            if (valid) {
              
                
                response.status(200).json({username:username})
                next();
            }
            else {
                next({ message: 'user is not valid' })
                // response.send('user is not valid');
            }
        }
        catch (error) {
            response.send(error);
        }
    }
    next();
}

module.exports = signIn;