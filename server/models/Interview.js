const mongoose=require("mongoose");

const interviewSchema=new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

overallScore:{
type:Number
},

confidence:{
type:Number
},

communication:{
type:Number
},

answers:[
{
question:String,
score:Number,
strength:String,
improvement:String
}
],

summary:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports=
mongoose.model(
"Interview",
interviewSchema
);