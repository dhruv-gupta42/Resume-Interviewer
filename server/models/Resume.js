const mongoose=require("mongoose");

const resumeSchema=new mongoose.Schema({

fileName:String,

extractedText:String,

questions:String,

uploadedAt:{
type:Date,
default:Date.now
}

});

module.exports=
mongoose.model(
"Resume",
resumeSchema
);