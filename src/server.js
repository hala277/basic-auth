'use strict';

// const { request, response } = require('express');
// define express
const express = require('express');

// const authRouter = require('./auth/router.js');
const cors = require('cors');
// so i can use express methode and libraries in my app
const app = express();
const signInRote = require('./auth/middleware/basic');
const signUpRoute = require('./auth/middleware/signup');
const errorHandler = require('./middleware/500.js');
const errorHandler2 = require('./middleware/404.js');
app.use(express.json());
app.use(cors());





// route
app.get('/',(request,response) => {
    response.send('home route')
})

// app.use('/authRouter',authRouter);
app.post('/signup',signUpRoute);
app.post('/signin',signInRote);
// app.post('/signup',signUpRoute);
// start function 

// async function signinFunc(req,res) {
//     res.status(200).json(req.user);
// }

// 500 rout handler
app.use(errorHandler);

// 404 rout handler
app.use(errorHandler2); 



function start(port){
    app.listen(port,()=>{
console.log(`running on port ${port}`)
    })
}

// here i will export app, start so I can use them at index.js
module.exports = {
    app: app,
    start: start
}