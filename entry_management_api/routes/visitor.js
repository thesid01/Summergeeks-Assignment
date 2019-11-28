var express = require('express');
var router = express.Router();
var visitor = require('../models/visitor');
var host = require('../models/host');

router.post('/add/:id', (req, res, next) => {

    host.hostInfo.findById(req.params.id).exec((err,data)=>{
        if(!err){
            if(!data){
                res.send({added:0,error:"No such Host Exists"});
            }else{
                var newVisitor = {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    checkIn: Date(),
                    checkOut: Date(),
                    hostId : req.params.id
                };
                console.log(newVisitor);

                let checkInput = visitor.validateInput(newVisitor);
                if(checkInput.email == true && checkInput.phone == true){
            
                    visitor.visitorInfo.create(newVisitor, (err,data)=>{
                        if(err){
                            console.log("Error occured While adding visitor");
                            res.send({added: 0});
                          }else{
                            console.log("Visitor added");
                            // console.log(data);
                            host.update(req.params.id,data._id,(err)=>{
                                if(err){
                                    console.log("Host not available");
                                    visitor.visitorInfo.findByIdAndDelete(data._id,(err)=>{
                                        if(err){
                                            console.log("Unable to delete Visitor entry Error Occured");
                                        }
                                        res.send({"added":0});
                                    });
            
                                }else{
                                    res.send({"added":1});
                                    host.sendMail(req.params.id,data,(err)=>{
                                        if(err){
                                            console.log("Error while sending mail");
                                        }else{
                                            console.log("Mail Sent");
                                        }
                                    });

                                    visitor.sendCheckoutLink(data,(err)=>{
                                        if(err){
                                            console.log("Error while sending Checkout Link");
                                        }else{
                                            console.log("Checkout Link Sent");
                                        }
                                    });

                                    host.sendSMS(req.params.id,data,(err)=>{
                                        if(err){
                                            console.log("Error while sending SMS");
                                        }else{
                                            console.log("SMS Sent");
                                        }
                                    });
                                }
                            });
                          }
                    });
            
                }else{
                    console.log("Invalid Data");
                    res.send({added: 0 , error:checkInput});
                }
            }
        }else{
            console.log("Error Occured while checking host existence");
            res.send({"added" : 0 });
        }
    });
    
    
});

router.get('/checkout/:id', (req,res,next)=>{
    
    const doc = visitor.visitorInfo.findById(req.params.id).exec((err, data)=>{
        if(err){
            console.log("Error Occured while checkout");
            res.send({checkOut:0, error: "Error Occured while checkout"})
        }else{
            console.log(data);
            data.checkOut = Date();
            data.save();
            visitor.sendMail(data,(err)=>{
                if(err){
                    console.log("Error while sending mail");
                }else{
                    console.log("Mail Sent");
                }
            });
            visitor.sendSMS(data,(err)=>{
                if(err){
                    console.log("Error while sending SMS");
                }else{
                    console.log("SMS Sent");
                }
            });
            res.send({checkOut:1})
        }
    });
    
});


module.exports = router;
