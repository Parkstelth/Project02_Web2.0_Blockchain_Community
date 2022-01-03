var express = require('express');
var router = express.Router();
require('dotenv').config();
const env=process.env;
var Web3 = require('web3');
const db = require('../models');
const web3 = new Web3(env.WEB3_ADDRESS)
var erc20abi = require('./erc20abi') 
var bytecode = require('./bytecode');

async function deployToken() {
    try {
        await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
        const contract = new web3.eth.Contract(erc20abi, env.SERVER_ADDRESS);
        const receipt = contract
            .deploy({ data: bytecode, arguments: ["testToken", "TOT"] })
            .send({ from: env.SERVER_ADDRESS, gas: 2000000, gasPrice: "10000000000" })
            .then("transactionHash", async function (hash) {
              
            });
        return receipt;
    } catch (e) {
        console.log(e);
    }
}

router.post("/", async (req, res) => {

  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;
  
 if(reqUserName==='server'){
  db.users.findOne({
    where: {
        userName: reqUserName,
        password: reqPassword,
    },
}).then((result)=>{
  if (result == null) {
    res.status(502).send({ message: "저장된 서버 아이디/패스워드가 없습니다." });
}else{
  deployToken().then((hash) => {
    console.log(hash._address);
    res.status(200).send({contractAddress : hash._address});
});
}
})
 }
 else{
  res.status(501).send({message: 'You are not server'})
}
});

module.exports = router;