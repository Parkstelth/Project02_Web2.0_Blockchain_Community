var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const db = require('../models');

router.post('/', async function(req, res, next) {
   
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
        } else {
            db.post.create({
            userName: reqUserName,
            text: reqtext
        })
        res.status(201).send({ data : 'your post saved' });
        }
    })
})

module.exports = router;