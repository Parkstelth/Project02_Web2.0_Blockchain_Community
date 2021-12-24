var express = require('express');
var router = express.Router();
var Web3 = require('web3')
const web3 = new Web3('http://localhost:7545')
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



/* POST faucet 0.1 ETH */
router.post("/ethfaucet", (req, res) => {


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

contractAddress = env.ERC20_CONTRACT_ADDRESS; // 직접 할당 대신에 밑에서 deploy 

router.post("/serveToken",(req, res) => {
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

router.post("/deploy", async (req, res) => {

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