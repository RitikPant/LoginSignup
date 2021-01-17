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
.route("/:username/")
.get((req,res) => {
    var uname = req.params.username;
    
    pool.query(`select username,token from tokens where username=?`, [uname], (err, results, feilds) => {
        if(err)
        {
            res.send(err);
        }
        else if(results == ""){
            res.send("You are not sign in");
        }
        else{
            const authHeader = results[0].token;
            const token = authHeader && authHeader.split('+')[1];

            if (token == null || token == uname){
                return res.send(`You are not logged in`);
            }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err){
                    return res.sendStatus(403);
                }
                pool.query(`UPDATE tokens SET token=? WHERE username=?`, [uname, uname], (err,results,fields) => {
                    if(err)
                        res.send(err);
                    res.send("Logout successfull, go to login page ");
                });
            })
        }
    });
});

module.exports = router;