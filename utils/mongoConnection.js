const mongoose = require('mongoose');

const connectDB = async(uri) => {

    const connectionInstance = await mongoose.connect(uri);
    console.log('mongodb connected go ahead');
    return connectionInstance;

    
}

module.exports = {connectDB:connectDB};