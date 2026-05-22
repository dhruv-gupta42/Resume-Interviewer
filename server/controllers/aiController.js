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

You are an intelligent AI interviewer.

Analyze this resume carefully and identify:

- Current/Past job roles
- Industry
- Skills
- Experience
- Responsibilities

Generate interview questions specifically for THIS candidate.

Rules:

- Software Developer → coding, projects, technologies
- Warehouse/Logistics → inventory, operations, safety, teamwork, problem-solving
- Customer Service → communication, customer handling
- Marketing → campaigns, analytics, strategy
- Finance → financial processes and analysis
- Any other profession → adapt naturally

Generate exactly:

5 role-specific questions

3 HR/behavioral questions

2 experience-based questions

Return ONLY a numbered list.

Resume:

${resumeText}

`;

const response=

await axios.post(

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

const generatedQuestions=

response.data
.choices[0]
.message
.content;

res.json({

questions:generatedQuestions

});

}

catch(error){

console.log(

"AI ERROR:",

error.response?.data ||
error.message

);

return res.status(500).json({

error:
"Question generation failed"

});

}

};