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

You are an intelligent interviewer.

Analyze the candidate's resume and identify:
- role
- industry
- skills
- experience

Generate questions specifically for THAT candidate.

Generate:
- 5 role-specific questions
- 3 HR questions
- 2 experience-based questions

Return only a numbered list.

Resume:

${resumeText}

`;

const response=await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:"openai/gpt-4.1-mini",

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
?.message?.content;

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
JSON.stringify(
error.response?.data ||
error.message,
null,
2
)
);

res.status(500).json({

error:
error.response?.data ||
error.message ||
"Question generation failed"

});

}

};