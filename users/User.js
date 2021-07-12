const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{
    user_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },user_email:{
        type: Sequelize.STRING,
        allowNull: false
    },user_password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
User.sync({force:false}).then(()=>{});

module.exports = User;