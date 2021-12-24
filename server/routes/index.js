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

module.exports = router;