const Sequelize = require("sequelize");

const connection = new Sequelize('apigames','danilodev','153161',{
    host:'localhost',
    dialect:'postgres',
    timezone:'-03:00'
})

module.exports = connection;