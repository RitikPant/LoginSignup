require('dotenv').config();

const express = require("express");
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json());

const { createPool } = require("mysql");
const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"info",
    connectionLimit:10
});

app.get("/signup/:name/:username/:pwd", (req,res) => {

    var name = req.params.name;
    var uname = req.params.username;
    var pass = req.params.pwd;

    const user = { name : uname };
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    //res.json({ accessToken : accessToken});
    const tokenWithSecretKey = "secretKey+" + accessToken;

    pool.query(`INSERT INTO userInfo(name, username, pass, token) VALUES (?,?,?,?)`, [name,uname,pass,tokenWithSecretKey], (err, results, feilds) => {
        if(err)
            res.send(`Cannot sign in : ${err.sqlMessage}`);
        else{
            res.send(` signup successful, your token is : ${accessToken}`);
        }
    });

})

app.get("/login/:username/:pwd",  (req,res) => {

    var uname = req.params.username;
    var pass = req.params.pwd;

    pool.query(`select username,pass,token from userInfo where username=?`, [uname], (err, results, feilds) => {
        if(err)
            console.log(err);
        else if(results[0].pass==pass){
            const authHeader = results[0].token;
            const token = authHeader && authHeader.split('+')[1]
            if (token == null) return res.send(`token is is null 401 ${token}`);
  
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                console.log(err);
                if (err) 
                    return res.sendStatus(403);
                res.json(results);
            })

        }
        else
            res.send("Username and Password Does not match");
    });
})

app.listen(8000,(err) => {
    console.log("listening");
})