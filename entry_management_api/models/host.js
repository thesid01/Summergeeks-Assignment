var mongoose= require("mongoose");
var validator = require('validator');
var visitor = require('./visitor');
var nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
const config = require('../config/config')

var hostSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address : String,
  visitors : [String],
  timestamp : Date
});

let host =  mongoose.model("host",hostSchema);

function validateInput(newhost){

    var response = {
        "email":  validator.isEmail(newhost.email),
        "phone" : String(newhost.phoneNumber).length==10
    }

    return response;
}

function showhosts(){
    host.find({ }).populate("host").exec(function(err,data){
        if(err){
          console.log(err)
        }else{
          console.log(data);
        }
      })
}

function update(host_id, visitor_id,callback){
  var error;
  host.findById(host_id,(err,data)=>{
    if(err){
      error = err;
    }else{
      data.visitors.push(visitor_id);
      data.save();
    }
  });
  callback(error);
}

async function sender(host_data,data) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: config.mailInfo.service,
    auth: {
      user: config.mailInfo.username,
      pass: config.mailInfo.password
    }
  });

  var message = `
  <strong>Visitor Name :</strong> `+data.name+`
  <br><strong>Visitor Phone Number :</strong> `+data.phoneNumber+`
  <br><strong>Visitor Email :</strong> `+data.email+`
  `;
  let info = await transporter.sendMail({
    from: config.mailInfo.username,
    to: host_data.email,
    subject: "Remainder for meeting",
    html: message
  });

  console.log("Message sent: %s", info.messageId);
}

function sendMail(host_id, data,callback){
  console.log(data.email);
  var error;
  host.findById(host_id).exec((err,host_data)=>{
    if(err){
      error = err;
    }else{
      sender(host_data,data).catch(console.error);
    }
  })
  callback(error);
}

function sendSMS(host_id, data,callback){
  console.log(data.phoneNumber);
  var error;
  host.findById(host_id).exec((err,host_data)=>{
    if(err){
      error = err;
    }else{
      const nexmo = new Nexmo({
        apiKey: config.nexmoInfo.API_KEY,
        apiSecret: config.nexmoInfo.SECRET_KEY,
      }, {debug:true});

      const from = data.name;
      const to = '918604074906';
      const text = `
      Visitor Name : `+data.name+`
      Visitor Phone Number : `+data.phoneNumber+`
      Visitor Email : `+data.email+`
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
module.exports.hostInfo = host;
module.exports.validateInput = validateInput;
module.exports.update = update;
module.exports.sendMail = sendMail;
module.exports.sendSMS = sendSMS;
