const express = require("express");
const app = express();
let router = express.Router();


const jwt = require('jsonwebtoken')
router.use(express.json());

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

        const user = { name : uname };
        
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        const tokenWithSecretKey = "secretKey+" + accessToken;
        
        try{
            const result = await pool.query(`INSERT INTO userInfo(name, username, pass, token) VALUES (?,?,?,?)`, [name,uname,pass,tokenWithSecretKey]);
            res.send(` signup successful, your token is : ${accessToken}`);
        } catch(err){
                res.send(`Cannot sign in : ${err}`);
        }
    }
    sign();

});

module.exports = router;