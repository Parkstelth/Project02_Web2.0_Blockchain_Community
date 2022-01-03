var express = require('express');
var router = express.Router();
var Web3 = require('web3');
require('dotenv').config();
const env = process.env;
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
  }).then(async (result) => {
    if (result == null) {
      res.status(502).send({
        message: "주소/패스워드 누락 또는 존재하지 않음"
      });
    } else {

      try {
        let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
          from: env.SERVER_ADDRESS,
        });
        const balance = await contract.methods.allowance(env.SERVER_ADDRESS, result.dataValues.address).call();

        res.status(200).send({
          balance: web3.utils.fromWei(balance, 'ether')
        })
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  });
})


router.post("/getmetabalance", async (req, res) => {
  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;

  db.users.findOne({
    where: {
      userName: reqUserName,
      password: reqPassword,
    },
  }).then(async (result) => {
    if (result == null) {
      res.status(502).send({
        message: "주소/패스워드 누락 또는 존재하지 않음"
      });
    } else {

      try {
        let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
          from: env.SERVER_ADDRESS,
        });
        const balance = await contract.methods.balanceOf(result.dataValues.address).call();

        res.status(200).send({
          balance: web3.utils.fromWei(balance, 'ether')
        })
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  });
})



router.get("/getsymbol", async (req, res) => {
  let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
    from: env.SERVER_ADDRESS,
  });
  const symbol = await contract.methods._symbol().call();
  res.status(200).send({
    data: symbol
  })
})

//사용자 사이 전송
router.post("/sendallowance", async (req, res) => {
  let reqName, recName, sendAmount, reqAddress
  reqName = req.body.userName;
  recName = req.body.receiveName
  sendAmount = req.body.amount;
 if(reqName===recName){
  res.status(201).send({
    message: "자기 자신에게 보낼 수 없습니다."
  });
 }
 else{
  db.users.findOne({ //전송자 주소 검색
    where: {
      userName: reqName,
    },
  }).then((result1) => {
    reqAddress = result1.dataValues.address;
  })

  db.users.findOne({
    where: {
      userName: recName,
    },
  }).then(async (result) => {
    if (result == null) {
      res.status(201).send({
        message: "존재하지 않는 사용자입니다."
      });
    } else {
      try {
        await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
        let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
          from: env.SERVER_ADDRESS,
        });

        const senderBalance = await contract.methods.allowance(env.SERVER_ADDRESS, reqAddress).call();
        const receiveBalance = await contract.methods.allowance(env.SERVER_ADDRESS, result.dataValues.address).call();
        const transAmount = web3.utils.toWei(String(sendAmount), 'ether')

        if (senderBalance >= transAmount) {
          //처리시작
          const changeSender = parseInt(senderBalance) - parseInt(transAmount);
          const changeReceive = parseInt(receiveBalance) + parseInt(transAmount);

          //전송자 차감
          await contract.methods.approve(reqAddress, String(changeSender))
            .send({
              from: env.SERVER_ADDRESS,
              gas: 2000000,
              gasPrice: "100000000000"
            })
            .on("receive", (receive) => {
              return receive;
            })
            .then((tx) => {
              return tx.transactionHash;
            })
            .then((tx) => {
              contract.methods
                .allowance(env.SERVER_ADDRESS, reqAddress)
                .call()
                .then((e) => {
                  return e;
                })
                .then((balance) => {
                  res.status(200).send({
                    message: "전송완료",
                    data: {
                      username: reqName,
                      address: reqAddress,
                      txHash: tx,
                      tokenBalance: balance,
                    },
                  });
                });
            });

          //입금자 추가
          await contract.methods.approve(result.dataValues.address, String(changeReceive))
            .send({
              from: env.SERVER_ADDRESS,
              gas: 2000000,
              gasPrice: "100000000000"
            })
            .on("receive", (receive) => {
              return receive;
            })
            .then((tx) => {
              res.status(200)
            })
          //처리종료
        } else {
          res.status(201).send({
            message: '가진 양 보다 많은 토큰을 전송 할 수 없습니다.'
          })
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  });
 }
})


//메타마스크로 정식 출금
router.post("/sendtometamask", async (req, res) => {
  let reqUserName, reqPassword, reqsendAmount;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;
  reqsendAmount = req.body.amount

  db.users.findOne({
    where: {
      userName: reqUserName,
      password: reqPassword,
    },
  }).then(async (result) => {
    if (result == null) {
      res.status(502).send({
        message: "계정 누락 또는 존재하지 않음"
      });
    } else {

      await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
      let contract = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
        from: env.SERVER_ADDRESS,
      });

      await contract.methods
        .allowance(env.SERVER_ADDRESS, result.dataValues.address)
        .call()
        .then((e) => {
          return e;
        }).then(async (balance) => {
          if ((web3.utils.fromWei(balance, 'ether')) >= reqsendAmount) {
            const changeBalance = parseInt((web3.utils.fromWei(balance, 'ether'))) - parseInt(reqsendAmount);
            const changeBalance2 = web3.utils.toWei(String(changeBalance), 'ether')
            await contract.methods.approve(result.dataValues.address, changeBalance2)
              .send({
                from: env.SERVER_ADDRESS,
                gas: 2000000,
                gasPrice: "100000000000"
              })

            const changeSendBalance = web3.utils.toWei(String(reqsendAmount), 'ether')
            await contract.methods
              .transfer(result.dataValues.address, changeSendBalance) //0은 18개가 되어야 1개는
              .send({
                from: env.SERVER_ADDRESS,
                gas: 2000000,
                gasPrice: "100000000000"
              })
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
                      message: '전송 완료',
                      data: {
                        username: reqUserName,
                        address: result.dataValues.address,
                        txHash: tx,
                        tokenBalance: balance,
                      },
                    });

                  });
              })
          } else {
            res.status(201).send({
              message: '가진 양 보다 많은 토큰을 전송 할 수 없습니다.'
            })
          }
        })
    }
  })
})

module.exports = router;