var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');
require('dotenv').config();
const env = process.env;
const web3 = new Web3(env.WEB3_ADDRESS)
var erc721abi = require('./erc721abi')
var erc20abi = require('./erc20abi')
var bytecode721 = require('./bytecode721');


async function deployToken() {
  try {
    await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
    const contract = new web3.eth.Contract(erc721abi, env.SERVER_ADDRESS);
    const receipt = contract
      .deploy({
        data: bytecode721
      })
      .send({
        from: env.SERVER_ADDRESS,
        gas: 4000000,
        gasPrice: "10000000000"
      })
      .then("transactionHash", async function (hash) {
        return hash
      });
    return receipt;
  } catch (e) {
    console.log(e);
  }
}
// deploy 부분
router.post("/", async (req, res) => {

  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;

  if (reqUserName === 'server') {
    db.users.findOne({
      where: {
        userName: reqUserName,
        password: reqPassword,
      },
    }).then((result) => {
      if (result == null) {
        res.status(502).send({
          message: "저장된 서버 아이디/패스워드가 없습니다."
        });
      } else {
        deployToken().then((hash) => {
          console.log(hash.options.address);

          res.status(200).send({
            contractAddress: hash.options.address
          });
        });
      }
    })
  } else {
    res.status(501).send({
      message: 'You are not server'
    })
  }
});

// 서버의 nft 가격 확인 부분
router.get("/getnftprice", async (req, res) => {
  await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
  let contract = await new web3.eth.Contract(erc721abi, env.ERC721_CONTRACT_ADDRESS, {
    from: env.SERVER_ADDRESS,
  });
  await contract.methods
        .price()
        .call()
        .then((price) => {
          res.status(201).send({price: web3.utils.fromWei(price,'ether')})
        })

})
// 서버의 nft 유저 구매 부분)
router.post("/buynft", async (req, res) => {

  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;
  tokenURI = "https://www.futurekorea.co.kr/news/photo/202104/145945_150512_1130.jpg"

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

      await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY);
      let contract = await new web3.eth.Contract(erc721abi, env.ERC721_CONTRACT_ADDRESS, {
        from: env.SERVER_ADDRESS,
      });
      let contract2 = await new web3.eth.Contract(erc20abi, env.ERC20_CONTRACT_ADDRESS, {
        from: env.SERVER_ADDRESS,
      });

      //NFT 구매 로직 시작
      await contract.methods
        .setToken(env.ERC20_CONTRACT_ADDRESS)
        .call()
        .then(async (token) => {
          try {
            await contract.methods
              .callPrice(token, result.dataValues.address)
              .call()
              .then(async (nftPrice) => {
                //allowance 마이너스
                await contract2.methods
                  .allowance(env.SERVER_ADDRESS, result.dataValues.address)
                  .call()
                  .then(async (balance) => {
                    const changeBalance = parseInt(balance) - parseInt(nftPrice)
                    const changeBalance2 = String(changeBalance)
                    await contract2.methods.approve(result.dataValues.address, changeBalance2)
                      .send({
                        from: env.SERVER_ADDRESS,
                        gas: 2000000,
                        gasPrice: "100000000000"
                      })
                      .then(async (x) => {
                        //nft 토큰 전송
                        await contract.methods
                          .mintNFT(result.dataValues.address, tokenURI)
                          .send({
                            from: env.SERVER_ADDRESS,
                            gas: 2000000,
                            gasPrice: "100000000000"
                          })
                          .then((receipt2) => {
                            res.status(201).send({
                              tx: receipt2.transactionHash,
                              message: 'NFT 구매 완료'
                            })
                          })
                      })

                  })
              })
          } catch (error) {
            res.status(201).send({
              message: "토큰이 부족합니다."
            })
          }
        })
    }
  })
});

module.exports = router;