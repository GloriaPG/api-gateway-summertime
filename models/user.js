/**
 * Created by gloria on 12/2/14.
 */

/*users.js*/

"use strict"

var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        id: 			{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
        , name: 		{ type: DataTypes.STRING, allowNull: false }
        , mail: 		{ type: DataTypes.STRING, allowNull: false, unique:true }
        , is_active: 	{ type: DataTypes.BOOLEAN, defaultValue: 1 }
        , password:     { type: DataTypes.STRING, allowNull: false}
    }, {
        instanceMethods: {
            find: function(onSuccess, onError) {
                User.findAll(
                    {
                        order: 'name ASC'
                    }, {raw: true}).success(onSuccess).error(onError);
            },
            findById: function(userId, onSuccess, onError) {
                User.find({where: {id: userId}}, {raw: true}).success(onSuccess).error(onError);
            },
            create: function(onSuccess, onError) {
                var name 		= this.name
                    , mail 		= this.mail
                    , is_active = this.is_active;

                User.build({ name: name, mail: mail, is_active: is_active })
                    .save().success(onSuccess).error(onError);
            },
            updateById: function(userId, onSuccess, onError) {
                var name 		= this.name
                    , mail 		= this.mail
                    , is_active = this.is_active;

                User.update({ name: name, mail: mail, is_active: is_active },{where: {id: userId} }).success(onSuccess).error(onError);
            },
            removeById: function(userId, onSuccess, onError) {
                User.destroy({where: {id: userId}}).success(onSuccess).error(onError);
            },
            setPassword: function(password, done) {
                return bcrypt.genSalt(10, function(err, salt) {
                    return bcrypt.hash(password, salt, function(error, encrypted) {
                        this.password = encrypted;
                        this.salt = salt;
                        return done();
                    });
                });
            },
            verifyPassword: function(password, done) {
                return bcrypt.compare(password, this.password, function(err, res) {
                    return done(err, res);
                });
            }
        }
    });

    return User;
};