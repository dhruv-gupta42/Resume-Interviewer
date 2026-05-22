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
error
);

res.status(500).json({

error:
error.message ||
"Question generation failed"

});

}

};