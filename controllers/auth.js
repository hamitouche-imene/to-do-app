const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});

exports.register = (req,res)=> {
console.log(req.body);

const{ name , email , password , passwordconfirm } = req.body
db.query('SELECT email FROM users WHERE email = ?', [email],async (err, results)=>{
    if(err){
        console.log(err);
    }
    if(results.length>0){
        return res.render('register', {message: 'Email already exists'});
    }
    else if (password !== passwordconfirm){
        return res.render('register', {message: 'Passwords do not match'});
    }

let hashedPassword = await bcrypt.hash (password,8);
console.log(hashedPassword);

    db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, result) => {
        if (err) {
   
   console.log(err);}
   else {
    return res .render('register', {message: 'User registred successfully'});
   }

   })
    
}) 

}
// Login Controller
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.render('login', { message: 'An error occurred' });
        }
       
        
        if (results.length == 0) {
            return res.render('login', { message: 'Email not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) {
            return res.render('login', { message: 'Incorrect password' });
        }

        // Set session and redirect to home page
        req.session.user = results[0];
        return res.redirect('/');
    });
};

// Logout Controller
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        return res.redirect('/login');
    });
};
