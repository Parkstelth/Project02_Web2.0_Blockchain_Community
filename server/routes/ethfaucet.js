var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');

router.post('/', async function(req, res, next) {
    const web3 = new Web3('http://localhost:7545')

    let reqUserName, reqPassword;
    reqUserName = req.body.userName;
    reqPassword = req.body.password;
    
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
            web3.eth.accounts.privateKeyToAccount('379cc31787df8342bdd7b36673f6732ecd709b7f3cec18a58786744b322c1810') //가나슈의 프라이빗키
    
           //서명 후 전송처리
  
            web3.eth.accounts.signTransaction({
                to: result.dataValues.address,
                value: '1000000000000000000',
                gas: 2000000
            },'379cc31787df8342bdd7b36673f6732ecd709b7f3cec18a58786744b322c1810')
            .then((value)=>{
                return value.rawTransaction;
            })
            .then(async(tx)=>{
                web3.eth.sendSignedTransaction(tx, async function(err,hash) {
                    if(!err) {
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
                    } else {
                        console.log('transfer failed!')
                    }
                })
            })
        }
    });
})

module.exports = router;