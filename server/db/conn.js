const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


async function main(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to the Database!")
}

module.exports = main;