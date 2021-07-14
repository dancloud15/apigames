const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const Game = require("./games/Game");
const User = require("./users/User");
const connection = require("./database/database");
const JWTSecret = "dfunjkiofweoiu389njf9p4niufuuwhfu29830mfisndf0293urfewfn";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function auth(req,res,next){
    const authToken = req.headers['authoriorization'];
    if (authToken !=undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token,JWTSecret,(err,data)=>{
            if (err) {
                res.status(401);
                res.json({err:"Token Invalido"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email:data.email};
                req.empresa = "Danilo Dev";
                next();
            }
        })
        
    } else {
        
    }
}

connection
    .authenticate()
    .then(() => {
        console.log("Conexão efetuada");
    }).catch((error) => {
        console.log(error);
    });

//LISTAR TODOS OS JOGOS
app.get("/games", (req, res) => {
    Game.findAll({
    }).then(games => {
        res.statusCode = 200;
        res.json(games);
    }).catch(err => {
        res.statusCode = 400;
        res.json({ game: err });
    })
})

//SALVAR TODOS OS JOGOS
app.post("/game", (req, res) => {
    console.log("teste");
    var title = req.body.game_title
    var year = req.body.game_year
    var price = req.body.game_price
    Game.create({
        game_title: title,
        game_year: year,
        game_price: price
    }).then(games => {
        res.statusCode = 200;
        res.json({ game: 'salvo' });
    }).catch(err => {
        res.statusCode = 400;
        res.json({ game: err });
    })
})

//LISTAR UM JOGO ESPECIFICO
app.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.json({ msg: "Valor não numérico" });
    } else {
        Game.findOne({
            where: {
                game_id: req.params.id
            }
        }).then(game => {
            if (game != undefined) {
                res.statusCode = 200;
                res.json({ game: game });
            } else {
                res.statusCode = 400;
                res.json({ msg: 'Jogo não encontrado' });
            }
        }).catch(err => {
            res.statusCode = 400;
            res.json({ game: err });
        })
    }
})

//DELETAR UM O JOGO
app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.json({ msg: "Valor não numérico" });
    } else {
        Game.findOne({
            where: {
                game_id: req.params.id
            }
        }).then(game => {
            if (game != undefined) {
                game.destroy();
                res.statusCode = 200;
                res.json({ msg: 'Jogo excluido' });
            } else {
                res.statusCode = 400;
                res.json({ msg: 'Jogo não encontrado' });
            }
        }).catch(err => {
            res.statusCode = 400;
            res.json({ game: err });
        })

    }
})

//ATUALIZAR UM JOGO */ BUGADO*////
app.put("/game/:id", async (req, res) => {
    var id = req.params.id;
    const {game_title, game_year, game_price} = req.body;
    if (isNaN(id)) {
        res.statusCode = 400;
        res.json({ msg: "Valor não numérico" });
    } else {
        console.log(game_title);
        await Game.update(
            {game_title, game_year, game_price},
            {
                where:{game_id:id }
            },
            
        ).then(()=>{
            res.statusCode = 200;
            res.json({ msg: 'Jogo atualizado' });
        }).catch(err => {
            console.log("erro");
            res.statusCode = 400;
            res.json({ game: err });
        })
    }
})

app.listen(45679, () => {
    console.log("API RODANDO");
})