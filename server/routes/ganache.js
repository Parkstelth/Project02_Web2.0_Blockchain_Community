var express = require('express');
var router = express.Router();
var Web3 = require('web3');

router.get("/", async (req, res) => {

    const web3 = new Web3('http://localhost:8545')
    const accounts =  await web3.eth.getAccounts();
    res.status(200).send(accounts)
  });

module.exports = router;