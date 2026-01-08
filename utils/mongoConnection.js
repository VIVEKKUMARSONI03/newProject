const mongoose = require('mongoose');

const connectDB = async(uri) => {

    const connectionInstance = await mongoose.connect(uri);
    console.log('mongodb connected and connection instance is : ',connectionInstance.Connection);
    return connectionInstance;

    
}

module.exports = {connectDB:connectDB};