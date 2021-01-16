const express = require("express");
const app = express();
let router = express.Router();


const { createPool } = require("mysql");
const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"info",
    connectionLimit:10
});

router
.route("/:name/:username/:pwd")
.get((req,res) => {
    const sign = async () => {

        var name = req.params.name;
        var uname = req.params.username;
        var pass = req.params.pwd;

        const tokenWithSecretKey = "-1";
        
        try{
            const signUpResult = await pool.query(`INSERT INTO userInfo(name, username, pass, token) VALUES (?,?,?,?)`, [name,uname,pass,tokenWithSecretKey]);
            const logInResult = await pool.query(`INSERT INTO tokens(username, token) VALUES (?,?)`, [uname,"0"]);
            res.send(` signup successful`);
        } catch(err){
                res.send(`Cannot sign in : ${err}`);
        }
    }
    sign();

});

module.exports = router;