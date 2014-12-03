/**
 * Created by gloria on 12/2/14.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.route('/users')
    .post(function(req, res) {

        var name 	= req.body.name
            , mail 		= req.body.mail
            , is_active = req.body.is_active
            , created_at= req.body.created_at
            , password  = req.body.password;

        var user = models.user.build({ name: name, mail: mail,password:password,is_active:is_active, created_at: created_at });

        user.create(
            function(success){
                res.json({ message: 'El usuario se ha creado correctamente.' });
            },
            function(error) {
                res.send(error);
            });
    })

    .get(function(req, res) {
        var user = models.user.build();

        user.find(
            function(users) {
                if(users) {
                    res.json(users);
                } else {
                    res.send(401, "El listado de usuarios se ha cargado correctamente.");
                }
            },
            function(error) {
                res.send(500, "El listado de usuarios no ha cargado correctamente." + error);
            });
    });

router.route('/users/:user_id')
    .put(function(req, res) {
        var user = models.user.build();

        user.name = req.body.name;
        user.mail = req.body.mail;
        user.is_active = req.body.is_active;
        user.created_at = req.body.created_at;
        user.password= req.body.password;

        user.updateById(req.params.user_id, function(success) {
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
        var user = models.user.build();

        user.findById(req.params.user_id, function(user) {
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
        var user = models.user.build();

        user.removeById(req.params.user_id, function(users) {
            if (users) {
                res.json({ message: 'El usuario se ha eliminado correctamente.' });
            } else {
                res.send(401, "El usuario no existe.");
            }
        }, function(error) {
            res.send("El usuario no existe.");
        });
    });

module.exports = router;