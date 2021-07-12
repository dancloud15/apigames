const Sequelize = require("sequelize");
const connection = require("../database/database");

const Game = connection.define('games',{
    game_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },game_title:{
        type: Sequelize.STRING,
        allowNull: false
    }, game_year:{
        type: Sequelize.INTEGER,
        allowNull: false
    }, game_price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});
Game.sync({force:false}).then(()=>{});
module.exports = Game;