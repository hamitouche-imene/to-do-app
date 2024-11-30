const express = require('express');
const Router = express.Router();

Router.get('/',(req,res) => {
    res.render("index");
});


Router.get('/register',(req,res) => {
    //resend page home
    res.render("register");
});

// Login page route
Router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = Router;