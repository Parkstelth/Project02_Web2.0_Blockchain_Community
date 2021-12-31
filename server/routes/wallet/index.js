var express = require("express");
var router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require("fs");
const db = require('../../models');



router.post('/user', async(req,res) => {
  // 포스트맨에서 userName, password를 넣으면
  let reqUserName, reqPassword;
  reqUserName = req.body.userName;
  reqPassword = req.body.password;

  // user에서 find로 userName을 찾고,
  db.users.findOrCreate({
    where: {
      userName: reqUserName
    },
    default: {
      password: reqPassword
    }
  })
  .then(([user, created]) => {
    if (!created) {
      // 있으면 있다고 응답
      res.status(201).send("User exists");
    // 없으면 DB에 저장
    } else {
      // 니모닉코드 생성  
      let mnemonic;
      mnemonic = lightwallet.keystore.generateRandomSeed();
      // 생성된 니모닉코드와 password로 keyStore, address 생성
      lightwallet.keystore.createVault({
        password: reqPassword, 
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'"
      },
      function (err, ks) {
        ks.keyFromPassword(reqPassword, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);
          
          let address = (ks.getAddresses()).toString();
          let prv_key = ks.exportPrivateKey(address,pwDerivedKey);
          let keyStore = ks.serialize();

          db.users.update({
            password: reqPassword,
            address: address,
            privateKey: prv_key,
            mnemonic: mnemonic,
            tokenbalance : 0
          }, {
            where: {
              userName: reqUserName
            }
          })
          .then(result => {
            // 주소를 보여준다
            
            res.json(address);
          })
          .catch(err => {
            console.error(err);
          })
        });
      });
    }
  })
});

module.exports = router;