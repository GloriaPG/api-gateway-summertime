/**
 * Created by gloria on 12/2/14.
 */

// Get the packages we need
var express 	= require('express')
    , path 			= require('path')
    , debug 		= require('morgan')
    , bodyParser 	= require('body-parser')
    , app 			= express()
    , models        = require("./models");


// Create our Express application
var app = express();

// Use enviroment defined port or 3000
var port = process.env.PORT || 3000

app.use(debug('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//List routes
var user = require('./routes/user');

// Define Routers
app.use('/api/v1',user);


// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found :D bitches');
    err.status = 404;
    next(err);
});

// Start server
app.set('port', port);

//Create schema database
models.sequelize.sync().success(function () {
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
});





