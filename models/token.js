/**
 * Created by gloria on 2/12/14.
 */


/*token.js*/

"token strict"


module.exports = function (sequelize, DataTypes) {
    var Token = sequelize.define('token', {
        id: 			{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
        , value: { type: DataTypes.STRING, allowNull: false }
        , user_id: 	{ type: DataTypes.INTEGER, defaultValue: 1 }
        , client_id: 	{ type: DataTypes.INTEGER, defaultValue: 1 }
    }, {
        instanceMethods: {
            find: function(onSuccess, onError) {
                Token.findAll(
                    {
                        order: 'value ASC'
                    }, {raw: true}).success(onSuccess).error(onError);
            },
            findById: function(tokenId, onSuccess, onError) {
                Token.find({where: {id: tokenId}}, {raw: true}).success(onSuccess).error(onError);
            },
            findByValue: function(value, onSuccess, onError) {
                Token.find({where: {value: value}}, {raw: true}).success(onSuccess).error(onError);
            },
            create: function(onSuccess, onError) {
                var value 		= this.value
                    , redirectUri 	= this.redirectUri
                    , user_id = this.user_id
                    , client_id = this.client_id;

                Token.build({ value: value, redirectUri: redirectUri, user_id: user_id , client_id:client_id })
                    .save().success(onSuccess).error(onError);
            },
            updateById: function(tokenId, onSuccess, onError) {
                var value 		= this.value
                    , redirectUri 	= this.redirectUri
                    , user_id = this.user_id
                    , client_id = this.client_id;

                Token.update({ value: value, redirectUri: redirectUri, user_id: user_id , client_id: client_id },{where: {id: tokenId} }).success(onSuccess).error(onError);
            },
            removeById: function(tokenId, onSuccess, onError) {
                Token.destroy({where: {id:tokenId}}).success(onSuccess).error(onError);
            }
        }
    });

    return Token;
};