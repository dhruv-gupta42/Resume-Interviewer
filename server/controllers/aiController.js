const axios = require("axios");

exports.generateQuestions = async(req,res)=>{

try{

const { resumeText } = req.body;

if(!resumeText){

return res.status(400).json({
message:"Resume text missing"
});

}

const prompt = `
You are an intelligent interviewer.

Analyze the candidate's resume and identify:
- their job role
- industry
- skills
- work experience

Generate interview questions specifically based on THEIR background.

Rules:
- If they are a software developer → ask technical coding/project questions.
- If they worked in warehouses/logistics → ask warehouse operations, inventory, teamwork, safety and problem-solving questions.
- If they worked in marketing → ask marketing questions.
- If they worked in customer service → ask customer service questions.

Generate:
- 5 role-specific questions
- 3 behavioral/HR questions
- 2 experience-based questions

Resume:

${resumeText}

Return only a numbered list.
`;

const response = await axios.post(

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

res.json({

questions:
response.data.choices[0].message.content

});

}

catch(error){

console.log(
error.response?.data || error.message
);

// fallback so project keeps working even if AI provider fails
res.status(200).json({

questions:`
1. Explain React hooks and when useEffect should be used.
2. What is the difference between MongoDB and SQL databases?
3. Explain the Node.js event loop.
4. How would you optimize a React application?
5. Explain JWT authentication.

HR:
6. Tell me about yourself.
7. Why should we hire you?
8. Describe a challenge you faced.

Projects:
9. Explain the architecture of your Finance Tracker project.
10. Why did you choose MongoDB?
`

});

}

};