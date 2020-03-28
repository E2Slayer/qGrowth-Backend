const mongoose = require('mongoose');


//require('dotenv').config()

let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    //geting rid off the depreciation errors
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};

//const uri =  process.env.MONGODB_URI

//const uri =  'mongodb://localhost:27017/dropentbackend'
const uri =  'mongodb+srv://admin:skek1004@cluster0-lqg9x.gcp.mongodb.net/test?retryWrites=true&w=majority'


const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(uri, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();





exports.mongoose = mongoose;
