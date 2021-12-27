var express = require('express');
var router = express.Router();
var Web3 = require('web3');
require('dotenv').config();
const env=process.env;
const web3 = new Web3(env.WEB3_ADDRESS)

router.get("/", async (req, res) => {

    const accounts =  await web3.eth.getAccounts();
    res.status(200).send(accounts)
  });

module.exports = router;