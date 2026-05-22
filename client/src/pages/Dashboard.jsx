import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip
}
from "recharts";

import {motion} from "framer-motion";

import {
Upload,
Mic,
History
}
from "lucide-react";

import api from "../services/api";
import PageLayout from "../components/PageLayout";

function Dashboard(){

const navigate=useNavigate();

const [history,setHistory]=useState([]);

const user=
JSON.parse(
localStorage.getItem("user")
);

const questions=
JSON.parse(
localStorage.getItem("questions")
);

const interviewReady=
questions &&
questions.length>0;

useEffect(()=>{

async function loadHistory(){

try{

const response=
await api.get(
`/interviews/history/${user.id}`
);

setHistory(
response.data
);

}
catch(error){

console.log(error);

}

}

if(user){

loadHistory();

}

},[]);

const totalInterviews=
history.length;

const avgScore=
history.length
?
Math.round(

history.reduce(
(sum,item)=>
sum+item.overallScore,
0
)/history.length
)
:
0;

const bestScore=
history.length
?
Math.max(
...history.map(
item=>item.overallScore
)
)
:
0;

const chartData=

history.length

?

history.map(
(item,index)=>({

name:`#${index+1}`,
score:item.overallScore

})
)

:

[
{name:"0",score:0}
];

return(

<PageLayout>

<div className="max-w-7xl mx-auto">

<h1 className="text-6xl font-bold mb-10">
Dashboard
</h1>

<div className="grid grid-cols-3 gap-6 mb-10">

<motion.div
whileHover={{scale:1.03}}
onClick={()=>navigate("/upload")}
className="
cursor-pointer
p-8
rounded-3xl
bg-white
text-black
flex
flex-col
items-center
justify-center
gap-3
"
>

<Upload size={40}/>

<h2 className="text-xl font-semibold">
Upload Resume
</h2>

</motion.div>


<motion.div

whileHover={
interviewReady
?
{scale:1.03}
:
{}
}

onClick={()=>{

if(interviewReady){

navigate(
"/interview"
);

}

}}

className={`
p-8
rounded-3xl
flex
flex-col
items-center
justify-center
gap-3

${
interviewReady

?

"cursor-pointer bg-white/5 border border-white/10"

:

"bg-white/5 opacity-40"

}

`}
>

<Mic size={40}/>

<h2 className="text-xl font-semibold">
Start Interview
</h2>

{

!interviewReady &&

<p className="text-gray-400 text-sm">
Upload a resume first
</p>

}

</motion.div>


<motion.div
whileHover={{scale:1.03}}
onClick={()=>navigate("/history")}
className="
cursor-pointer
p-8
rounded-3xl
bg-white/5
border
border-white/10
flex
flex-col
items-center
justify-center
gap-3
"
>

<History size={40}/>

<h2 className="text-xl font-semibold">
Interview History
</h2>

</motion.div>

</div>


<div className="grid grid-cols-3 gap-6 mb-8">

<div className="p-6 rounded-3xl bg-white/5">

<p className="text-gray-400">
Interviews
</p>

<h1 className="text-4xl mt-3">
{totalInterviews}
</h1>

</div>


<div className="p-6 rounded-3xl bg-white/5">

<p className="text-gray-400">
Average Score
</p>

<h1 className="text-4xl mt-3">
{avgScore}
</h1>

</div>


<div className="p-6 rounded-3xl bg-white/5">

<p className="text-gray-400">
Best Score
</p>

<h1 className="text-4xl mt-3">
{bestScore}
</h1>

</div>

</div>


<div className="
p-8
rounded-3xl
bg-white/5
h-[300px]
">

<h2 className="
text-xl
font-semibold
mb-5
">

Performance Trend

</h2>

<ResponsiveContainer
width="100%"
height="100%"
>

<LineChart data={chartData}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="score"
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</PageLayout>

);

}

export default Dashboard;