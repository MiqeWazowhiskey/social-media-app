const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Posts = Sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
    //you need to write this function before create Comments table
    Posts.associate = (models)=>{
        //each post has many comment
        Posts.hasMany(models.Comments, {
            //delete all the comments when the post deleted
            onDelete:'cascade',

        })
    }
    return Posts
}