var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/', async function(req, res) {
    let allpost=[]
    await db.post.findAll().then((res)=> {
        console.log(res);
        for (let i=0 ; i<res.length;i++) {
            allpost.push(res[i].dataValues)
        }
    })
    res.status(200).send(allpost)
})

router.post('/posting', async function(req, res) {
    reqid = req.body.id
    await db.post.findOne({
        where: {
            id: reqid,
        },
    })
    .then((result)=> {
        res.status(200).send(result)
    })
})

module.exports = router;