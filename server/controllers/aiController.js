const axios=require("axios");

exports.generateQuestions=async(req,res)=>{

try{

const {resumeText}=req.body;

if(!resumeText){

return res.status(400).json({
message:"Resume text missing"
});

}

const prompt=`

You are an AI interviewer.

Analyze the resume and generate interview questions based ONLY on the candidate's experience and role.

Generate:

5 role-specific questions
3 HR questions
2 experience-based questions

Resume:

${resumeText}

Return only a numbered list.

`;

const response=

await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:"mistralai/mistral-7b-instruct:free",

messages:[

{
role:"user",
content:prompt
}

]

},

{

headers:{

Authorization:
`Bearer ${process.env.OPENROUTER_API_KEY}`,

"Content-Type":
"application/json",

"HTTP-Referer":
"https://resumeinterviewer.netlify.app",

"X-Title":
"Resume Interviewer"

}

}

);

const questions=

response.data
?.choices?.[0]
?.message
?.content;

if(!questions){

throw new Error(
"No questions returned"
);

}

res.json({
questions
});

}

catch(error){

console.log(

"AI ERROR:",

error.response?.data ||
error.message

);

res.status(500).json({

error:
error.response?.data ||
error.message ||
"AI generation failed"

});

}

};