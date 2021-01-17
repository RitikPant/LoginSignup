const express = require("express");
const app = express();
let router = express.Router();

const signup = require("./signup/signup");
router.use("/signup", signup);

const login = require("./login/login");
router.use("/login", login);

const myInfo = require("./myInfo/myInfo");
router.use("/myInfo", myInfo);

const logout = require("./logout/logout");
router.use("/logout", logout);


module.exports = router;