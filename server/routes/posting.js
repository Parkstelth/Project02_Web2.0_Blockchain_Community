var express = require('express');
var router = express.Router();
const db = require('../models');

router.post('/', async function(req, res, next) {
    
    let reqUserName, reqtext, reqtitle, reqclass;
    reqUserName = req.body.userName;
    reqtext = req.body.text;
    reqtitle = req.body.title;
    reqclass = req.body.class;
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
            text: reqtext,
            title: reqtitle,
            class: reqclass,
        })
        res.status(201).send({ data : 'your post saved' });
        }
    })
})

module.exports = router;