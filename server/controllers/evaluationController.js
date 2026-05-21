const axios=require("axios");
const Interview=
require("../models/Interview");

exports.evaluateAnswers=async(req,res)=>{

try{

const {
answers,
userId
}=req.body;

const prompt=`

You are an interview evaluator.

Evaluate these interview answers:

${JSON.stringify(answers)}

Return ONLY valid JSON:

{
"overallScore":82,
"confidence":78,
"communication":85,

"answers":[
{
"question":"Question",
"score":8,
"strength":"Good explanation",
"improvement":"Add examples"
}
],

"summary":"Overall summary"
}

No markdown
No tables
Return JSON only

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

"Content-Type":"application/json",

"HTTP-Referer":
"http://localhost:5173",

"X-Title":
"Resume AI Assistant"
}
}

);

const aiResponse=
response.data
.choices[0]
.message.content;

const parsedData=
JSON.parse(aiResponse);


await Interview.create({

userId,

overallScore:
parsedData.overallScore,

confidence:
parsedData.confidence,

communication:
parsedData.communication,

answers:
parsedData.answers,

summary:
parsedData.summary

});

res.json(
parsedData
);

}
catch(error){

console.log(error);

res.status(500).json({

error:error.message

});

}

};