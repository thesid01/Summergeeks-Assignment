var express = require('express');
var router = express.Router();
var host = require('../models/host');

router.get('/show-hosts', (req, res, next) => {
    host.hostInfo.find().exec((err,data)=>{
        console.log(data);
        res.send(data);
    })
});

router.get('/check-host/:id',(req,res,next)=>{
    host.hostInfo.findById(req.params.id).exec((err,data)=>{
        if(err || !data){
            res.send({exist:0});
        }else{
            res.send({exist:1});
        }
    })
})
module.exports = router;