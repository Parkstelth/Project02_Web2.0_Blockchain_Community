var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');

var Tx = require('@ethereumjs/tx').Transaction;

var erc20abi = require('./erc20abi');
//https://medium.com/@drhot552/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-web3%EB%A1%9C-%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%BB%A8%ED%8A%B8%EB%9E%99%ED%8A%B8-%ED%95%A8%EC%88%98%ED%98%B8%EC%B6%9C%ED%95%98%EA%B8%B0-a2770c83ce11
router.post('/', async function(req, res, next) {
    const web3 = new Web3('http://localhost:7545')
    let reqUserName;
    //입력받은 username을 가지고
    reqUserName = req.body.userName;
    
    db.users.findOne({
        where: {
            userName: req.body.userName
        }
    }).then((result) => {
        //데이터베이스에 저장되어 있는 주소를 가져옵니다
        web3.eth.accounts.privateKeyToAccount(result.dataValues.privateKey) //검색한 사용자의 프라이빗키
        const serverPrivateKey = web3.eth.accounts.privateKeyToAccount('379cc31787df8342bdd7b36673f6732ecd709b7f3cec18a58786744b322c1810') //가나슈의 프라이빗키

        const ERC20contract = new web3.eth.Contract(abi, 'deploy한 컨트렉트 주소');
        
        

        web3.eth.getTransactionCount(send_account, (err, txcount) => {
            const txObject = {
                nonce:    web3.utils.toHex(txcount),
                gasLimit: web3.utils.toHex(10000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: 'deploy한 컨트렉트 주소',
                //글 쓴 사람에게 토큰지급
                data: ERC20contract.methods.transfer(result.dataValues.address, '1000000000000000000').encodeABI()
            };

            const tx = new Tx(txObject);
            tx.sign(serverPrivateKey);

            const serializedTx = tx.serialize();    
            //서명한 트랜잭션을 전송
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')
            .once('response', (hash) => {
                const userBalance = ERC20contract.methods.balanceOf(result.dataValues.address).call()
                res.send({
                    message: "Serving Successed", 
                    data: {
                        username: req.params.userName,  // 사용자 이름
                        address: result.dataValues.address,  // 받는 계정의 주소
                        txHash: hash,  // 트랜잭션 해시
                        tokenBalance: userBalance,  // 사용자 이더 잔액                           
                    }
                })
            }))
        })             
    })
})

module.exports = router;