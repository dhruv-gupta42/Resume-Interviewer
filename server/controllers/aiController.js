const axios=require("axios");

exports.generateQuestions=async(req,res)=>{

const {resumeText}=req.body;

try{

if(!resumeText){

return res.status(400).json({
message:"Resume text missing"
});

}

const prompt=`

You are an intelligent interviewer.

Analyze the resume and determine:
- role
- industry
- skills
- experience

Generate:

5 role-specific questions
3 HR questions
2 experience-based questions

Return ONLY a numbered list.

Resume:

${resumeText}

`;

const response=await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:"openai/gpt-oss-20b",

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
response.data?.choices?.[0]?.message?.content;

if(!questions){

throw new Error("No questions returned");

}

return res.json({
questions
});

}

catch(error){

console.log(
"OPENROUTER ERROR:",
JSON.stringify(
error.response?.data||
error.message,
null,
2
)
);

// fallback
return res.status(200).json({

questions:`

1. Tell me about yourself.
2. Describe your previous work responsibilities.
3. What challenges did you face in your previous role?
4. Describe a problem you solved.
5. How do you work under pressure?
6. Why should we hire you?
7. Describe teamwork experience.
8. Tell me about a difficult situation.
9. Explain a process improvement you made.
10. What are your career goals?

`

});

}

};