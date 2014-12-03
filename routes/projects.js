/**
 * Created by gloria on 12/2/14.
 */

var express = require('express');
var router  = express.Router()
var authController = require('../controllers/auth');

router.get('/projects',authController.isAuthenticated, function(req, res) {
    res.json({ message: 'You are running dangerously low on beer!' });
});