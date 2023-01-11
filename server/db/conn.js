const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

// const DB = 'mongodb://localhost:27017/mongocrud'
const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);

mongoose.connect(DB).then(() => {
    console.log('connection successfull');
}).catch((err) => console.log(`connection fail`));