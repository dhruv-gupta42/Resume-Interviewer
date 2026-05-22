const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

exports.generateQuestions=async(req,res)=>{

const { resumeText } = req.body;

try{

if(!resumeText){

return res.status(400).json({
message:"Resume text missing"
});

}

const model=
genAI.getGenerativeModel({

model:"gemini-2.0-flash"

});

const prompt=`

You are an intelligent interviewer.

Analyze this resume and generate:

- 5 role-specific questions
- 3 HR questions
- 2 experience-based questions

Resume:

${resumeText}

Return only a numbered list.

`;

const result=
await model.generateContent(
prompt
);

const response=
result.response.text();

res.json({

questions:response

});

}

catch(error){

console.log(
"GEMINI ERROR:",
error.message
);

const lowerResume=
resumeText.toLowerCase();

let fallbackQuestions="";

if(

lowerResume.includes("warehouse") ||
lowerResume.includes("inventory") ||
lowerResume.includes("logistics")

){

fallbackQuestions=`

1. How do you maintain accuracy while packing and picking orders?
2. Tell me about handling high-volume workloads.
3. How would you handle a warehouse safety issue?
4. Describe your experience with inventory management.
5. How do you prioritize urgent shipments?

6. Tell me about yourself.
7. Why should we hire you?
8. Describe a challenge you faced.

9. Explain your contribution to workflow improvements.
10. Tell us about reducing waste or improving efficiency.

`;

}

else{

fallbackQuestions=`

1. Tell me about yourself.
2. What are your strengths?
3. What are your weaknesses?
4. Describe a challenge you solved.
5. Why should we hire you?
6. Explain a project you worked on.
7. Tell me about teamwork experience.
8. Describe a difficult situation.
9. What are your goals?
10. Why do you want this role?

`;

}

return res.status(200).json({

questions:fallbackQuestions

});

}

};