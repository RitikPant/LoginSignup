require('dotenv').config();

const express = require("express");
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json());

const services = require("./services/services");
app.use("/services", services);


app.listen(8000,(err) => {
    console.log("listening");
})