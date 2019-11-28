const mongoose=require('mongoose');
const url="mongodb://localhost:27017/officeEntry";
    
mongoose.connect(url,{useNewUrlParser:true},(err)=>{  
    if(err){  
        console.log('Error in database connection');  
    }else{  
        console.log('Database Connected!');  
    }  
})  
module.exports=mongoose;