const Interview=
require("../models/Interview");

exports.getHistory=
async(req,res)=>{

try{

const history=
await Interview.find({

userId:req.params.userId

})
.sort({
createdAt:-1
});

res.json(
history
);

}
catch(error){

res.status(500).json({
error:error.message
});

}

};