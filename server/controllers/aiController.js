const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

exports.generateQuestions = async(req,res)=>{

try{

const { resumeText } = req.body;

if(!resumeText){

return res.status(400).json({

message:"Resume text missing"

});

}

const model =
genAI.getGenerativeModel({

model:"gemini-2.0-flash"

});

const prompt = `

You are an intelligent interviewer.

Analyze this resume and identify:

- job role
- industry
- skills
- experience

Generate interview questions specifically for THAT candidate.

Rules:

- Software Developer → coding/project questions
- Warehouse → inventory, safety, logistics
- Customer Service → communication/customer handling
- Marketing → campaigns/analytics
- Finance → finance-related questions
- Any other profession → adapt naturally

Generate exactly:

5 role-specific questions
3 HR questions
2 experience-based questions

Return only a numbered list.

Resume:

${resumeText}

`;

const result =
await model.generateContent(
prompt
);

const response =
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

const lowerResume =
resumeText.toLowerCase();

let fallbackQuestions="";

if(
lowerResume.includes("warehouse") ||
lowerResume.includes("logistics") ||
lowerResume.includes("inventory")
){

fallbackQuestions=`

1. How do you maintain speed and accuracy while picking orders?
2. Tell me about handling high-volume workloads in a warehouse.
3. How would you respond to a warehouse safety issue?
4. Describe your experience with inventory management.
5. How do you prioritize multiple urgent shipments?

6. Tell me about yourself.
7. Describe a challenge you faced at work.
8. Why should we hire you?

9. Explain your contribution to improving workflow.
10. Tell us about a time you increased efficiency.

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

res.json({

questions:fallbackQuestions

});

}

};