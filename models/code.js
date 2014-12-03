/**
 * Created by gloria on 2/12/14.
 */


/*code.js*/

"code strict"


module.exports = function (sequelize, DataTypes) {
    var Code = sequelize.define('code', {
        id: 			{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
        , value: { type: DataTypes.STRING, allowNull: false }
        , redirectUri: 	{ type: DataTypes.STRING, allowNull: false, unique:true }
        , user_id: 	{ type: DataTypes.INTEGER, defaultValue: 1 }
        , client_id: 	{ type: DataTypes.INTEGER, defaultValue: 1 }
    }, {
        instanceMethods: {
            find: function(onSuccess, onError) {
                Code.findAll(
                    {
                        order: 'value ASC'
                    }, {raw: true}).success(onSuccess).error(onError);
            },
            findById: function(codeId, onSuccess, onError) {
                Code.find({where: {id: codeId}}, {raw: true}).success(onSuccess).error(onError);
            },
            create: function(onSuccess, onError) {
                var value 		= this.value
                    , redirectUri 	= this.redirectUri
                    , user_id = this.user_id
                    , client_id = this.client_id;

                Code.build({ value: value, redirectUri: redirectUri, user_id: user_id , client_id:client_id })
                    .save().success(onSuccess).error(onError);
            },
            updateById: function(codeId, onSuccess, onError) {
                var value 		= this.value
                    , redirectUri 	= this.redirectUri
                    , user_id = this.user_id
                    , client_id = this.client_id;

                Code.update({ value: value, redirectUri: redirectUri, user_id: user_id , client_id: client_id },{where: {id: codeId} }).success(onSuccess).error(onError);
            },
            removeById: function(codeId, onSuccess, onError) {
                Code.destroy({where: {id:codeId}}).success(onSuccess).error(onError);
            }
        }
    });

    return Code;
};