var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/', async function(req, res, next) {
    let allpost=[]
    await db.post.findAll().then((res)=> {
        for (let i=0 ; i<res.length;i++) {
            allpost.push(res[i].dataValues)
        }

    })
    res.status(200).send(allpost)
})

module.exports = router;