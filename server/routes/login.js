var express = require('express');
var router = express.Router();
const db = require('../models');

router.post('/', function(req, res) {
    let reqUserName, reqPassword;
    reqUserName = req.body.userName;
    reqPassword = req.body.password;
    
    db.users.findOne({
        where: {
            userName: reqUserName,
            password: reqPassword,
        },
    }).then((result)=>{
        if (result == null) {
            res.status(201).send({ data: false });
        } else {
            res.status(201).send({ data: true });
        }
    })
  });
  
  module.exports = router;
  