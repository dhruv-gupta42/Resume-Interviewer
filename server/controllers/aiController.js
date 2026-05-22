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

Analyze the candidate resume and identify:

- role
- industry
- skills
- work experience

Generate:

5 role-specific questions
3 HR questions
2 experience-based questions

Return only a numbered list.

Resume:

${resumeText}

`;

const response=await axios.post(

"https://api.groq.com/openai/v1/chat/completions",

{

model:"llama-3.3-70b-versatile",

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
`Bearer ${process.env.GROQ_API_KEY}`,

"Content-Type":
"application/json"

}

}

);

const questions=

response.data
?.choices?.[0]
?.message
?.content;

return res.json({

questions

});

}

catch(error){

console.log(

"GROQ ERROR:",

error.response?.data ||
error.message

);

return res.status(500).json({

error:
error.response?.data ||
error.message

});

}

};