const dotenv = require("dotenv");
const express = require('express');
const mongoose  = require('mongoose');
const app = express();

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT; 

// connection db
require('./db/conn');

// middleware = convert data to json 
app.use(express.json());

//middleware = link the router 
app.use(require('./router/auth'));

//== Middelware example just for example==
// const middleware = (req, res, next) => {
//     console.log("hello this is the middleware");
//     next();
// }

// == without router use ==
// app.get('/', (req, res) => {
//     res.send('hello world');
// })

// app.get('/contact', (req, res) => {
//     res.send('this is the contact page');
// })

// app.get('/signin', (req, res) => {
//     res.send('this is the sign page');
// })

app.listen(PORT, () => {
    console.log(`server is running of http://localhost:5000`);
})
