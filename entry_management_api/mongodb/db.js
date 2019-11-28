const mongoose=require('mongoose');
const config = require('../config/config');

const url=config.mongoDB.url;
    
mongoose.connect(url,{useNewUrlParser:true},(err)=>{  
    if(err){  
        console.log('Error in database connection');  
    }else{  
        console.log('Database Connected!');  
    }  
})  
module.exports=mongoose;