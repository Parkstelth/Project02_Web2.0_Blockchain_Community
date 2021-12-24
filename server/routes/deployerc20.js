var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var Contract = require('web3-eth-contract');
const db = require('../models');

require('dotenv').config();
const env=process.env;

var erc20abi = require('./erc20abi') 
var bytecode = require('./bytecode');

router.get('/', async function(req, res, next) {
    const web3 = new Web3('http://localhost:7545')

    await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY)
    

    let reqUserName, reqPassword;
    reqUserName = 'server';
    reqPassword = req.body.password;
    
    db.users.findOne({
        where: {
            userName: reqUserName,
            password: reqPassword,
        },
    }).then((result)=>{
        if (result == null) {
        res.status(502).send({ message: "서버 계정의 아이디 또는 패스워드가 틀립니다." });
    } else {
    
        
        const myContract = new web3.eth.Contract(erc20abi)
        myContract.options.data = bytecode;
        myContract.deploy({
            arguments: [123, 'My String']
        })
        .send({
            from: '0xc835eecd5ac36d820b49d118f0ae289e171bc67d', //server address
            gas: 1500000,
            gasPrice: '20000000000'
        })
        .then(function(newContractInstance){
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
    }
  })
})

module.exports = router;