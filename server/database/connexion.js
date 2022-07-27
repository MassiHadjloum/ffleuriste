//const mongoose = require('mongoose');

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'massi',
    password: 'massi_Massi1',
    database: 'webDM'
});

const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'massi',
    password: 'massi_Massi1',
    database: 'webDM'
});

console.log("Connected to Mysql DB");

module.exports = pool;




/* const connectDB = async() => {
    try {
        //mongodb connexion string
        const con = await mongoose.connect('mongodb+srv://admin:admin1234@cluster0.3op4e.mongodb.net/users?retryWrites=true&w=majority', {

            // used to stop unwonted warnings in the cansole
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        });

        console.log(`MongoDB connected:${con.connection.host}`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
*/