/**
 * Created by gloria on 12/3/14.
 */
// Load required packages
var requestify = require('requestify');

// Create endpoint /api/users for GET
exports.getProjects = function(req, res) {

    requestify.get('http://104.131.76.72:8000/api/v1/projects')
        .then(function(response) {

            var hola = response.getBody();
            res.json(hola);
        }
    );
};