/**
 * Created by gloria on 12/2/14.
 */

// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.use(new BasicStrategy(
    function(username, password, callback) {

        var user = User.build();

        user.findByMail(username, function(user) {
            if(user) {
                return callback(null, user); //res.json(user);
            } else {
                return callback(err) //res.send(401, "El usuario no existe.");
            }
        }, function(error) {
            return callback(error)
        });


       /*** User.findOne({ username: username }, function (err, user) {
            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) { return callback(err); }

                // Password did not match
                if (!isMatch) { return callback(null, false); }

                // Success
                return callback(null, user);
            });
        }); ***/
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        var client = client.build();
        var user = User.build();
        var id_user = user.findByMail(username, function(user) {
            if(user) {
                callback(null,user);
            } else {
                callback(null,false);
            }
        }, function(error) {
            callback(null,error);
        });
        client.findByUserId(id_user,function(client) {

            if (!client || client.secret !== password) { return callback(null, false); }

            if(client) {
                return callback(null, client); //res.json(user);
            } else {
                return callback(err) //res.send(401, "El usuario no existe.");
            }
        }, function(error) {
            return callback(error)
        });
       /*** Client.findOne({ id: username }, function (err, client) {
            if (err) { return callback(err); }

            // No client found with that id or bad password
            if (!client || client.secret !== password) { return callback(null, false); }

            // Success
            return callback(null, client);
        });***/
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        var token = Token.build();
        token.findByValue(accessToken,function(token) {

            if (!token) { return callback(null, false); }

            var user = User.build();
            user.findById(token.userId, function(user) {
                if(user) {
                    return callback(null, token);
                } else {
                    return callback(null, false);
                }
            }, function(error) {
                return callback(null, error);
            });

            return callback(null,token)
        });
        /*** Token.findOne({value: accessToken }, function (err, token) {
            if (err) { return callback(err); }

            // No token found
            if (!token) { return callback(null, false); }

            User.findOne({ _id: token.userId }, function (err, user) {
                if (err) { return callback(err); }

                // No user found
                if (!user) { return callback(null, false); }

                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });***/
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
