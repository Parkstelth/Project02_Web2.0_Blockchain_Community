var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');
require('dotenv').config();
const env = process.env;
const web3 = new Web3(env.WEB3_ADDRESS)
var erc20abi = require('./erc20abi')


router.post("/", (req, res) => {
    let reqUserName, reqPassword;
    reqUserName = req.body.userName;
    reqPassword = req.body.password;

    db.users.findOne({
        where: {
            userName: reqUserName,
            password: reqPassword,
        },
    }).then(async(result) => {
        if (result == null) {
            res.status(502).send({
                message: "주소/패스워드 누락 또는 존재하지 않음"
            });
        } else {

            let updatebalance = parseInt(result.dataValues.tokenbalance) + 1000000000000000000;
                 await db.users.update({
                    tokenbalance : String(updatebalance)
                  }, {
                    where: {
                      userName: result.dataValues.userName,
                    }
                  })
                  return result
        }
    }).then((result)=>{
       
        db.users.findOne({
            where: {
                userName: result.dataValues.userName,
                password: result.dataValues.password,
            },
        }).then((result2)=>{
                            res.status(200).send({
                    message: "Serving Successed",
                    data: {
                        username: result2.dataValues.userName,
                        address: result2.dataValues.address,
                        tokenBalance: result2.dataValues.tokenbalance,
                    },
                });
        })
    })
});

module.exports = router;


//////////////////
// 1토큰 전송 코드
// let reqUserName, reqPassword;
// reqUserName = req.body.userName;
// reqPassword = req.body.password;

// if(reqUserName==='server'){ //서버 자신에게 토크전송을 막는다
// res.status(201).send({message: 'You are server!'})
// }
// else{
// db.users.findOne({
//   where: {
//       userName: reqUserName,
//       password: reqPassword,
//   },
// }).then(async (result)=>{
// if (result == null) {
//   res.status(502).send({ message: "주소/패스워드 누락 또는 존재하지 않음" });
// }else{

// await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
// let contract = await new web3.eth.Contract(erc20abi, contractAddress, {
//   from: env.SERVER_ADDRESS,
// });

// await contract.methods
//   .transfer(result.dataValues.address, "1000000000000000000") //0은 18개가 되어야 1개는
//   .send({ from: env.SERVER_ADDRESS, gas: 2000000, gasPrice: "100000000000"})
//   .on("receive", (receive) => {
//       return receive;
//   })
//   .then((tx) => {
//       return tx.transactionHash;
//   })
//   .then((tx) => {
//       contract.methods
//           .balanceOf(result.dataValues.address)
//           .call()
//           .then((e) => {
//               return e;
//           })
//           .then((balance) => {
//               res.status(200).send({
//                   message: "Serving Successed",
//                   data: {
//                       username: reqUserName,
//                       address: result.dataValues.address,
//                       txHash: tx,
//                       tokenBalance: balance,
//                   },
//               });
//           });
//   });
// }
// })
// }


//1토큰 approve 코드

// await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
// let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
//   from: env.SERVER_ADDRESS,
// });

// await contract.methods
//               .allowance(env.SERVER_ADDRESS, result.dataValues.address)
//               .call()
//               .then((e) => {
//                   return e;
//               }).then(async (balance)=>{
//                 const changeBalance = parseInt(web3.utils.fromWei(balance,'ether'))+1
//                 const changeBalance2 = web3.utils.toWei(String(changeBalance),'ether')
//                 await contract.methods.approve(result.dataValues.address, changeBalance2)
//                 .send({ from: env.SERVER_ADDRESS, gas: 2000000, gasPrice: "100000000000"})
//                 .on("receive", (receive) => {
//                     return receive;
//                 })
//                 .then((tx) => {
//                     return tx.transactionHash;
//                 })
//                 .then((tx) => {
//                     contract.methods
//                         .allowance(env.SERVER_ADDRESS,result.dataValues.address)
//                         .call()
//                         .then((e) => {
//                             return e;
//                         })
//                         .then((balance) => {
//                             res.status(200).send({
//                                 message: "Serving Successed",
//                                 data: {
//                                     username: reqUserName,
//                                     address: result.dataValues.address,
//                                     txHash: tx,
//                                     tokenBalance: balance,
//                                 },
//                             });
//                         });
//                 });
//               })