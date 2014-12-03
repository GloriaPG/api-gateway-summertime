/**
 * Created by gloria on 3/12/14.
 */
/*client.js*/
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.route('/client')
    .post(function(req, res) {

        var name 	= req.body.name
            , secret 		= req.body.secret
            , user_id = req.body.user_id;

        var client = models.client.build({ name: name, secret: secret, user_id: user_id });

        client.create(
            function(success){
                res.json({ message: 'El cliente se ha creado correctamente.' });
            },
            function(error) {
                res.send(error);
            });
    })

    .get(function(req, res) {
        var client = models.client.build();

        client.find(
            function(client) {
                if(client) {
                    res.json(client);
                } else {
                    res.send(401, "El listado de usuarios se ha cargado correctamente.");
                }
            },
            function(error) {
                res.send(500, "El listado de usuarios no ha cargado correctamente.");
            });
    });

router.route('/client/:client_id')
    .put(function(req, res) {
        var client = models.client.build();

        client.name = req.body.name;
        client.secret = req.body.secret;
        client.user_id = req.body.user_id;


        client.updateById(req.params.client_id, function(success) {
            if(success) {
                res.json({ message: 'El usuario se ha actualizado correctamente.' });
            } else {
                res.send(401, "El usuario que desea actualizar no existe.");
            }
        }, function(error) {
            res.send("El usuario no existe.");
        });
    })

    .get(function(req, res) {
        var client = models.client.build();

        client.findById(req.params.client_id, function(client) {
            if(user) {
                res.json(user);
            } else {
                res.send(401, "El usuario no existe.");
            }
        }, function(error) {
            res.send("El usuario no existe.");
        });
    })

    .delete(function(req, res) {
        var client = models.client.build();

        client.removeById(req.params.client_id, function(client) {
            if (client) {
                res.json({ message: 'El usuario se ha eliminado correctamente.' });
            } else {
                res.send(401, "El usuario no existe.");
            }
        }, function(error) {
            res.send("El usuario no existe.");
        });
    });

module.exports = router;