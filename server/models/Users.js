const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Users = Sequelize.define('Users',{
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        }
    })
    Users.associate= ( models ) => {
        Users.hasMany(models.Posts, {
            onDelete: 'cascade',
        })
    }
    return Users
}