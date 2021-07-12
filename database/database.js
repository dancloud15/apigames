const Sequelize = require("sequelize");

const connection = new Sequelize('apigames','danilodev','153161',{
    host:'localhost',
    dialect:'postgres'
})

module.exports = connection;