var mongoose= require("mongoose");
var validator = require('validator');
var nodemailer = require('nodemailer');
var host  = require('./host');
const config = require('../config/config')


var visitorSchema = new mongoose.Schema({
	name: String,
    email: String,
    phoneNumber: String,
    checkIn: { type: Date, default: Date.now },
    checkOut: Date,
    hostId : String
});

let visitor =  mongoose.model("visitor",visitorSchema);

function validateInput(newVisitor){

    var response = {
        "email":  validator.isEmail(newVisitor.email),
        "phone" : String(newVisitor.phoneNumber).length==10
    }

    return response;
}

function showVisitors(){
    visitor.find({ }).populate("visitor").exec(function(err,data){
        if(err){
          console.log(err)
        }else{
          console.log(data);
        }
      })
}


async function sender(visitor_data,host_data) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailInfo.username,
      pass: config.mailInfo.password
    }
  });

  var message = `
  <strong>Name :</strong> `+visitor_data.name+`
  <br><strong>Host Name :</strong> `+host_data.name+`
  <br><strong>Host Phone Number :</strong> `+host_data.phoneNumber+`
  <br><strong>Host Email :</strong> `+host_data.email+`
  <br><strong>CheckIn Time :</strong> `+visitor_data.checkIn+`
  <br><strong>CheckOut Time :</strong> `+visitor_data.checkOut+`
  <br><strong>Address Visited :</strong> `+host_data.address+`
  `;
  let info = await transporter.sendMail({
    from: '"'+host_data.name+'" <'+host_data.email+'>',
    to: visitor_data.email,
    subject: "Details about meeting",
    html: message
  });

  console.log("Message sent: %s", info.messageId);
}

function sendMail(data,callback){
  console.log(data.email);
  var error;
  host.hostInfo.findById(data.hostId).exec((err,host_data)=>{
    if(err){
      error = err;
    }else{
      sender(data,host_data).catch(console.error);
    }
  });
  callback(error);
}

function sendSMS(data,callback){
  console.log(data.phoneNumber);
  var error;
  host.hostInfo.findById(data.hostId).exec((err,host_data)=>{
    if(err){
      error = err;
    }else{
      const nexmo = new Nexmo({
        apiKey: config.nexmoInfo.API_KEY,
        apiSecret: config.nexmo.SECRET_KEY,
      }, {debug:true});

      const from = data.name;
      const to = '918604074906';
      var text = `
      <strong>Name :</strong> `+data.name+`
      <br>\n<strong>Host Name :</strong> `+data.name+`
      <br><strong>Host Phone Number :</strong> `+data.phoneNumber+`
      <br><strong>Host Email :</strong> `+host_data.email+`
      <br><strong>CheckIn Time :</strong> `+data.checkIn+`
      <br><strong>CheckOut Time :</strong> `+data.checkOut+`
      <br><strong>Address Visited :</strong> `+host_data.address+`
      `;

      nexmo.message.sendSms('918604074906', to, text,{type:'unicode'},(err,response)=>{
        if(err){
          console.log(err);
          error = err;
        }else{
          console.log(response);
        }
      });
    }
  })
  callback(error);
}

async function checkoutSeneder(visitor_data,host_data){
  let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.mailInfo.username,
          pass: config.mailInfo.password
        }
      });
    
      var message = `
      You are visiting`+host_data.name+`<br>
      To Checkout Click here https://summergeeks-entry-management.herokuapp.com/visitor/checkout/`+visitor_data._id+`
      `;
      let info = await transporter.sendMail({
        from: '"'+host_data.name+'" <'+host_data.email+'>',
        to: visitor_data.email,
        subject: "Checkout Link for meeting",
        html: message
      });
    
      console.log("Message sent: %s", info.messageId);
    
}
function sendCheckoutLink(data,callback){
  console.log(data.email);
  var error;
  host.hostInfo.findById(data.hostId).exec((err,host_data)=>{
    if(err){
      error = err;
    }else{
      checkoutSeneder(data,host_data);
    }
  });
  callback(error);
}

module.exports.visitorInfo = visitor;
module.exports.validateInput = validateInput;
module.exports.sendMail = sendMail;
module.exports.sendSMS = sendSMS;
module.exports.sendCheckoutLink = sendCheckoutLink;
