var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');
require('dotenv').config();
const env=process.env;
const web3 = new Web3(env.WEB3_ADDRESS)


router.post("/", (req, res) => {

    let reqUserName, reqPassword;
    reqUserName = req.body.userName; //서버만받도록
    reqPassword = req.body.password;
    
    if(reqUserName === 'server'){
      db.users.findOne({
        where: {
            userName: reqUserName,
            password: reqPassword,
        },
    }).then((result) => {
       
        if (result == null) {
            res.status(502).send({ message: "Error Transaction Failed" });
        } else { 
            web3.eth.accounts.privateKeyToAccount(result.dataValues.privateKey) //검색한 사용자의 프라이빗키
            web3.eth.accounts.privateKeyToAccount(env.GANACHE_PRIVATEKEY) //가나슈의 프라이빗키
    
           //서명 후 전송처리
  
           web3.eth.accounts.signTransaction({
            to: result.dataValues.address,
            value: '1000000000000000000',
            gas: 2000000
        },env.GANACHE_PRIVATEKEY)
        .then((value)=>{
          return value.rawTransaction;
        })
        .then(async(tx)=>{
          
          web3.eth.sendSignedTransaction(tx, async function(err,hash){
            if(!err){
              const addressBalance = await web3.eth.getBalance(result.dataValues.address)
          
              res.status(200).send({
                message: "Faucet Successed",
                data:{
                  username: reqUserName,
                  address: result.dataValues.address,
                  balance: addressBalance,
                  txHash: hash
                }
              })
            }
            else{
              console.log('transfer failed!')
            }
          })
        })
        }
    });
    }
    else{
      res.status(501).send({message: 'You are not server'})
    }
  });

module.exports = router;