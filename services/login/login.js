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

    pool.query(`select username,pass from userInfo where username=?`, [uname], (err, results, feilds) => {

        if(err){
            res.send(err);
        }
        else if(results == "")
        {
            res.send("User not found");
        }
        else if(results[0].pass==pass){

            const user = { name : uname };
        
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            const tokenWithSecretKey = "secretKey+" + accessToken;
            
            pool.query(`UPDATE tokens SET token=? WHERE username=?`, [tokenWithSecretKey, uname], (err,results,fields) => {
                if(err){
                    console.log(err);
                }
                res.send("Login succefull, go to myInfo page ");
            });
        }
        else{
            res.send("Username and password does not match");
        }

    });
})


module.exports = router;