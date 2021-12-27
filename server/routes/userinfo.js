var express = require('express');
var router = express.Router();
var Web3 = require('web3');
require('dotenv').config();
const env=process.env;
const web3 = new Web3(env.WEB3_ADDRESS)

router.get("/getbalance", async (req, res) => {

  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;

  db.users.findOne({
    where: {
        userName: reqUserName,
        password: reqPassword,
    },
}).then(async (result)=>{
    if (result == null) {
        res.status(502).send({ message: "주소/패스워드 누락 또는 존재하지 않음" });
    }else{

        
    }
  });

})
module.exports = router;