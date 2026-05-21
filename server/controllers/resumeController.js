const Resume=require("../models/Resume");
const pdfParse=require("pdf-parse");
const fs=require("fs");
const axios=require("axios");

exports.uploadResume=async(req,res)=>{

try{

if(!req.file){

return res.status(400).json({
message:"No file uploaded"
});

}

const pdfBuffer=fs.readFileSync(
req.file.path
);

const data=await pdfParse(
pdfBuffer
);

const extractedText=data.text;

const prompt=`
You are a technical interviewer.

Based on the following resume:

${extractedText}

Generate:
- 5 technical interview questions
- 3 HR questions
- 2 project-based questions

Return only numbered questions.
`;

const aiResponse=await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{
model:"openai/gpt-oss-20b:free",

messages:[
{
role:"user",
content:prompt
}
]
},

{
headers:{
Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type":"application/json",
"HTTP-Referer":"http://localhost:5173",
"X-Title":"Resume AI Assistant"
}
}

);

const questions=
aiResponse.data.choices[0].message.content;

const resume=await Resume.create({

fileName:req.file.originalname,
extractedText,
questions

});

fs.unlinkSync(req.file.path);

res.status(201).json({

message:"Resume uploaded",

questions

});

}

catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

};