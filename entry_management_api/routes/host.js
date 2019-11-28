var express = require('express');
var router = express.Router();
var host = require('../models/host');

router.post('/add', (req, res, next) => {

    var newhost = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address : req.body.address,
        timestamp: Date()
    };

    let checkInput = host.validateInput(newhost);
    if(checkInput.email == true && checkInput.phone == true){

        host.hostInfo.create(newhost, (err)=>{
            if(err){
                console.log("Error occured While adding host");
                res.send({added: 0});
              }else{
                console.log("host added");
                res.send({"added":1});
              }
        });

    }else{
        console.log("Invalid Data");
        res.send({added: 0 , error:checkInput});
    }
    
});

module.exports = router;