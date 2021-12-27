var express = require('express');
var router = express.Router();
var Web3 = require('web3');
require('dotenv').config();
const env=process.env;
const db = require('../models');
const web3 = new Web3(env.WEB3_ADDRESS)
var erc20abi = require('./erc20abi') 

contractAddress = env.ERC20_CONTRACT_ADDRESS; // 직접 할당 대신에 밑에서 deploy 

router.post("/",(req, res) => {
  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;

 if(reqUserName==='server'){ //서버 자신에게 토크전송을 막는다
 res.status(201).send({message: 'You are server!'})
 }
 else{
  db.users.findOne({
    where: {
        userName: reqUserName,
        password: reqPassword,
    },
}).then(async (result)=>{
  if (result == null) {
    res.status(502).send({ message: "주소/패스워드 누락 또는 존재하지 않음" });
}else{

await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
let contract = await new web3.eth.Contract(erc20abi, contractAddress, {
    from: env.SERVER_ADDRESS,
});
await contract.methods
    .transfer(result.dataValues.address, "1000000000000000000") //0은 18개가 되어야 1개는
    .send({ from: env.SERVER_ADDRESS, gas: 2000000, gasPrice: "100000000000"})
    .on("receive", (receive) => {
        return receive;
    })
    .then((tx) => {
        return tx.transactionHash;
    })
    .then((tx) => {
        contract.methods
            .balanceOf(result.dataValues.address)
            .call()
            .then((e) => {
                return e;
            })
            .then((balance) => {
                res.status(200).send({
                    message: "Serving Successed",
                    data: {
                        username: reqUserName,
                        address: result.dataValues.address,
                        txHash: tx,
                        tokenBalance: balance,
                    },
                });
            });
    });
}
})
 }
});

module.exports = router;