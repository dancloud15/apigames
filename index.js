const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const Game = require("./games/Game");
const User = require("./users/User");
const connection = require("./database/database");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão efetuada");
    }).catch((error)=>{
        console.log(error);
    });

app.get("/games",(req, res) =>{
    Game.findAll({raw:true
    }).then(games =>{
        res.statusCode=200;
        res.json({game:games});
    }).catch(err =>{
        res.statusCode=400;
        res.json({game:err});
    })
})

app.listen(45679,()=>{
    console.log("API RODANDO");
})