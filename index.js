const express = require("express");
const app = express();

const { createPool } = require("mysql");
const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"info",
    connectionLimit:10
});

app.get("/api/:name/:username/:pwd", (req,res) => {

    var name = req.params.name;
    var uname = req.params.username;
    var pass = req.params.pwd;


    pool.query(`INSERT INTO userInfo(name, username, pass) VALUES (?,?,?)`, [name,uname,pass], (err, results, feilds) => {
        if(err)
            console.log(err);
        else
            res.send(results);
    });

})

app.get("/api/:username/:pwd", (req,res) => {

    var uname = req.params.username;
    var pass = req.params.pwd;


    pool.query(`select username,pass from userInfo where username=?`, [uname], (err, results, feilds) => {
        if(err)
            console.log(err);
        else if(results[0].pass==pass)
            res.send(results);
        else
            res.send("Try again");
    });

})
// pool.query(`INSERT INTO `userInfo`(`name`, `username`, `pass`) VALUES ([value-1],[value-2],[value-3])`)
app.listen(8000,(err) => {
    console.log("listening");
})