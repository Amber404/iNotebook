const mongoose=require('mongoose')
const mongoURI='mongodb://127.0.0.1:27017/iNotebook';
const ConnectToMongo=()=>{
   mongoose.connect(mongoURI,()=>{
    console.log("connected to db")
   })
}

module.exports=ConnectToMongo
  