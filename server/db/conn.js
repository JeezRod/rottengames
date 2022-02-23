const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

class DAO{
    connection = mongoose.connection;

    async connect(){
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the Database!")
    }
}



module.exports = new DAO;