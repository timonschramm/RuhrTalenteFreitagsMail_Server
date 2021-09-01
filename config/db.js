require('dotenv').config();
const mongoose = require('mongoose');


/*module.exports = async (arg1, arg2, arg3) => {

    await mongo().then(async mongoose => {
        try{
            console.log('Connected to mongo!!');
            await command.execute(client, message, args);
        }
        finally{
            mongoose.connection.close();
        }
    });
};*/


mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => console.log(err))

/*const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); }); 
*/
    