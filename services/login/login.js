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
.route("/:username/:pwd")
.get((req,res) => {

    var uname = req.params.username;
    var pass = req.params.pwd;

    pool.query(`select username,pass,token from userInfo where username=?`, [uname], (err, results, feilds) => {
        if(err){
            console.log(err);
        }
        else if(results[0].pass==pass){
            const authHeader = results[0].token;
            const token = authHeader && authHeader.split('+')[1];
            if (token == null){
                return res.send(`token is is null 401 ${token}`);
            }
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                console.log(err);
                if (err){
                    return res.sendStatus(403);
                }
                res.json(results);
            })
        }
        else
            res.send("Username and Password Does not match");
    });
})


module.exports = router;