var express = require('express');
var router = express.Router();
var Web3 = require('web3');
require('dotenv').config();
const env=process.env;
const web3 = new Web3(env.WEB3_ADDRESS)
var erc20abi = require('./erc20abi') 
const db = require('../models');


router.post("/getbalance", async (req, res) => {
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
    
    try{  
      let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
        from: env.SERVER_ADDRESS,
         });
      const balance = await contract.methods.allowance(env.SERVER_ADDRESS,result.dataValues.address).call();
      
      res.status(200).send({balance:web3.utils.fromWei(balance,'ether')})    
   }catch (e) {
       console.log(e);
       return e;
   }
      
  }
});


})







module.exports = router;



