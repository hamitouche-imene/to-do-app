const express = require("express");
const path = require("path");

//import mysql
 
const bodyParser = require('body-parser');
const mysql = require("mysql");
const dotenv = require ('dotenv');
const session = require('express-session');

dotenv.config({  path:'./.env'   });
const app = express();
// data base connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});


const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
console.log(__dirname);

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:false}));
// parse JSON bodies (as sent by API clients)
app.use(express.json());

// html page
app.set('view engine', 'hbs');


db.connect ((err) => {
    if (err) {
        console.log(err)
        } else{
        console.log("connected to database")
    }
});






//define Routes
app.use('/',require('./Routes/pages'));
app.use('/auth',require('./Routes/auth'));



// Démarrer le serveur sur le port 5000
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})