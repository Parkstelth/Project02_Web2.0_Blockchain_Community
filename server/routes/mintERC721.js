var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');
require('dotenv').config();
const env=process.env;
const web3 = new Web3(env.WEB3_ADDRESS)
var erc721abi = require('./erc721abi')


router.post("/",(req, res) => {
    
});

module.exports = router;

