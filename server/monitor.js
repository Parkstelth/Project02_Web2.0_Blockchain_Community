const express = require('express');
const app = express();
const port = 3002;
const Web3 = require('web3');
const db = require('./models');
app.get('/', function (req, res) { 
  res.send('Hello World!')
})

app.listen(port, function () {
	const web3 = new Web3('http://localhost:8545');
	web3.eth.getBlockNumber().then((block) => {
             		web3.eth.getBlock(block).then((obj) => {
			      web3.eth.getTransaction(obj.hash).then((obj) => {
			      db.txes.create(obj);
			})
		})
	})
})
