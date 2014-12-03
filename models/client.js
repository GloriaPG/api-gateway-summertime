/**
 * Created by gloria on 2/12/14.
 */
/**
 * Created by gloria on 12/2/14.
 */

/*client.js*/

"client strict"


module.exports = function (sequelize, DataTypes) {
    var Client = sequelize.define('client', {
        id: 			{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
        , name: { type: DataTypes.STRING, allowNull: false }
        , secret: 	{ type: DataTypes.STRING, allowNull: false, unique:true }
        , user_id: 	{ type: DataTypes.INTEGER, defaultValue: 1 }
    }, {
        instanceMethods: {
            find: function(onSuccess, onError) {
                Client.findAll(
                    {
                        order: 'name ASC'
                    }, {raw: true}).success(onSuccess).error(onError);
            },
            findById: function(clientId, onSuccess, onError) {
                Client.find({where: {id: clientId}}, {raw: true}).success(onSuccess).error(onError);
            },
            findByUserId: function(clientUserId, onSuccess, onError) {
                Client.find({where: {user_id: clientUserId}}, {raw: true}).success(onSuccess).error(onError);
            },
            create: function(onSuccess, onError) {
                var name 		= this.name
                    , secret 	= this.secret
                    , user_id = this.user_id;

                Client.build({ name: name, secret: secret, user_id: user_id})
                    .save().success(onSuccess).error(onError);
            },
            updateById: function(clientId, onSuccess, onError) {
                var name 		= this.name
                    , secret 	= this.secret
                    , user_id = this.user_id;

                Client.update({ name: name, secret: secret, user_id: user_id },{where: {id: clientId} }).success(onSuccess).error(onError);
            },
            removeById: function(clientId, onSuccess, onError) {
                Client.destroy({where: {id: clientId}}).success(onSuccess).error(onError);
            }
        }
    });

    return Client;
};