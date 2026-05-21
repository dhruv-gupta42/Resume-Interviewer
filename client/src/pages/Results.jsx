import {useEffect,useState} from "react";
import {motion} from "framer-motion";
import PageLayout from "../components/PageLayout";
import api from "../services/api";
import jsPDF from "jspdf";

function Results(){

const [report,setReport]=useState(null);
const [loading,setLoading]=useState(true);

useEffect(()=>{

const answers=
JSON.parse(
localStorage.getItem("answers")
);
const downloadReport=()=>{

const pdf=new jsPDF();

pdf.text(
"AI Interview Report",
20,
20
);

pdf.text(
report.summary,
20,
40
);

pdf.save(
"report.pdf"
);

};

async function scoreInterview(){

try{

const user=
JSON.parse(
localStorage.getItem(
"user"
)
);

const response=
await api.post(
"/evaluation/score",
{
answers,
userId:user.id
}
);

setReport(
response.data
);

}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

}

scoreInterview();

},[]);

if(loading){

return(

<PageLayout>

<div className="
flex
flex-col
items-center
justify-center
h-[70vh]
">

<div className="
w-16
h-16
border-4
border-white/10
border-t-white
rounded-full
animate-spin
mb-6
"/>

<h2 className="text-2xl">

AI analyzing your interview...

</h2>

</div>

</PageLayout>

)

}

return(

<PageLayout>

<div className="max-w-7xl mx-auto">

<h1 className="
text-6xl
font-bold
mb-10
">

Interview Report

</h1>


<div className="
grid
grid-cols-3
gap-6
mb-12
">

<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
">

<p className="text-gray-400">

Overall Score

</p>

<h1 className="text-5xl">

{report.overallScore}/100

</h1>

</div>


<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
">

<p className="text-gray-400">

Confidence

</p>

<h1 className="text-5xl">

{report.confidence}%

</h1>

</div>


<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
">

<p className="text-gray-400">

Communication

</p>

<h1 className="text-5xl">

{report.communication}%

</h1>

</div>

</div>


<h2 className="
text-3xl
font-bold
mb-8
">

Question Analysis

</h2>

<div className="space-y-6">

{

report.answers.map(
(item,index)=>(

<motion.div

key={index}

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
"

>

<div className="
flex
justify-between
items-start
mb-5
">

<h3 className="
text-xl
w-[80%]
">

{item.question}

</h3>

<div className="
px-4
py-2
rounded-full
bg-white
text-black
font-bold
">

{item.score}/10

</div>

</div>

<div className="mb-6">

<p className="
text-blue-400
font-semibold
mb-3
">

Your Answer

</p>

<div className="
p-5
rounded-2xl
bg-black/20
border
border-white/5
">

<p className="
text-gray-300
leading-7
">

{
JSON.parse(
localStorage.getItem("answers")
)?.[index]?.answer
||

"No answer provided"
}

</p>

</div>

</div>

<div className="mb-4">

<p className="
text-green-400
font-semibold
mb-2
">

Strength

</p>

<p className="text-gray-300">

{item.strength}

</p>

</div>

<div>

<p className="
text-yellow-400
font-semibold
mb-2
">

Improvement

</p>

<p className="text-gray-300">

{item.improvement}

</p>

</div>

</motion.div>

)

)

}

</div>


<div className="
mt-10
p-8
rounded-3xl
bg-white/5
border
border-white/10
">

<h2 className="
text-3xl
mb-5
">

Summary

</h2>

<p className="text-gray-300">

{report.summary}

</p>
<button

onClick={downloadReport}

className="
mt-8
px-8
py-4
rounded-full
bg-white
text-black
"

>

Download Report

</button>

</div>

</div>

</PageLayout>

)

}

export default Results;