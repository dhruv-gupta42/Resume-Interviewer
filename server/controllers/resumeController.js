const fs=require("fs");
const pdfParse=require("pdf-parse");

exports.uploadResume=async(req,res)=>{

try{

if(!req.file){

return res.status(400).json({
message:"No file uploaded"
});

}

const dataBuffer=
fs.readFileSync(
req.file.path
);

const pdfData=
await pdfParse(
dataBuffer
);

fs.unlinkSync(
req.file.path
);

res.json({

text:pdfData.text

});

}
catch(error){

console.log(error);

res.status(500).json({

error:error.message

});

}

};