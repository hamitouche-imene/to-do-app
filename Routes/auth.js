const express = require('express');
const Router = express.Router();
const authController = require('../controllers/auth');

Router.post("/register",authController.register)

// Login route
Router.post("/login", authController.login);

// Logout route
Router.get("/logout", authController.logout);

module.exports = Router;