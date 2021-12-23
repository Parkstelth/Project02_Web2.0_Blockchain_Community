var express = require('express');
var router = express.Router();
var Web3 = require('web3')
var Contract = require('web3-eth-contract');
const db = require('../models');
var erc20abi = require('./erc20abi') 
var bytecode = require('./bytecode');
const { response } = require('express');
require('dotenv').config();
const env=process.env;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mnemonic Wallet' });
});


/* GET ganache account */
router.get("/ganache", async (req, res) => {

  const web3 = new Web3('http://localhost:7545')
  const accounts =  await web3.eth.getAccounts();
  res.status(200).send(accounts)

});

/* POST Login */
router.post('/login', function(req, res) {
  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;
  
  db.users.findOne({
      where: {
          userName: reqUserName,
          password: reqPassword,
      },
  }).then((result)=>{
    if (result == null) {
      res.status(201).send({ data: false });
  } else{
    res.status(201).send({ data: true });
  }
  })


});

/* POST postingTEXT */
router.post('/posting', function(req, res) {
  let reqUserName, reqtext;
  reqUserName = req.body.userName;
  reqtext = req.body.text;
 
  db.users.findOne({
      where: {
          userName: reqUserName,
      },
  }).then((result)=>{
    if (result == null) {
      res.status(502).send({ message : 'undefined userName' });
  } else{
    db.post.create({
      userName: reqUserName,
      text: reqtext
    })
    res.status(201).send({ data : 'your post saved' });
  }
  })
});

router.get('/loadpost', async function(req, res) {
  let allpost=[]
   await db.post.findAll().then((res)=>{
    for(let i=0 ; i<res.length;i++){
      
      allpost.push(res[i].dataValues)
    }
  
  })
  res.status(200).send(allpost)
})



/* POST fault 0.1 ETH */
router.post("/ethfaucet", async (req, res) => {

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
});

router.get("/deployerc20", async (req, res) => {
 
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
  }else{
  
    
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
});

module.exports = router;