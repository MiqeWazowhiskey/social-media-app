const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Comments = Sequelize.define("Comments", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    })
    return Comments
}