'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
// const User = require('../models/users-model.js');
const { User } = require('../models/users-model');


const signIn = async (request, response, next) => {

    if (request.headers['authorization']) {
        let basicHeaderParts = request.headers.authorization.split(' ');
        console.log('basicHeaderParts --> ', basicHeaderParts);

        // to encode(username:password)
        let encodePart = basicHeaderParts.pop();
        console.log('encodePart --> ', encodePart);

        // to decode
        let decode = base64.decode(encodePart); //username:password
        console.log('decode --> ', decode);
        let [username, password] = decode.split(':'); //[username:password]
      
        try {
            const user = await User.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, user.password);
            
            if (valid) {

                // req.user = valid;
                // next();
                response.status(200).json({username:username})
                next();
            }
            else {
                // if the password was wrong --> user is not valid
                // next({ message: 'user is not valid' })
                // next(`invalid user ${error}`)
                response.send('user is not valid');
            }
        }
        catch (error) {
            // if the user name was wrong or not in the db --> error
            console.log(error);
            response.send('error');
            
        }
    }

}

module.exports = signIn;