const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DabaBase connected');
        
    } catch (error) {
        console.error(error);
        throw new Error('Error happened while connecting to DB')
    }
}

module.exports = {dbConnection}