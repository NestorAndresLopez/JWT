const express = require('express');
const Jwt = require('jsonwebtoken') ;
//hola
const app = express();

app.get('/', (req, res)=>{
    res.json({
        mensaje:"Nodejs and JWT"
    });
});

app.post('/login', (req, res)=>{
    const user ={
        id: 1,
        nombre: "Nestor",
        email: "n.andreslopez.nals@gmail.com"
    }
    Jwt.sign({user}, 'secretkey', {expiresIn:'20s'}, (err, token)=>{
        res.json({
            token
        });
    });
});

app.post('/post', verifyToken, (req, res)=>{
    Jwt.verify(req.token, 'secretkey', (error, authData) =>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "port fue creado",
                authData
            });
        }
    } )

});

//Autorization: Bearer <token>
function verifyToken (req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}


app.listen(3000, function(){
    console.log("nodejs app running...");
})