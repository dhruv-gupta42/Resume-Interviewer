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

import PageLayout from "../components/PageLayout";

function Dashboard(){

const navigate=useNavigate();

const questions=
JSON.parse(
localStorage.getItem(
"questions"
)
);

const interviewReady=
questions &&
questions.length>0;

const data=[

{name:"1",score:72},
{name:"2",score:85},
{name:"3",score:77},
{name:"4",score:92}

];

return(

<PageLayout>

<div className="max-w-7xl mx-auto">

<h1 className="
text-6xl
font-bold
mb-10
">

Dashboard

</h1>


<div className="
grid
grid-cols-3
gap-6
mb-12
">

{/* Upload Resume */}

<motion.div

whileHover={{
scale:1.03
}}

onClick={()=>
navigate("/upload")
}

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

<h2 className="
text-xl
font-semibold
">

Upload Resume

</h2>

</motion.div>


{/* Start Interview */}

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

"bg-white/5 opacity-40 cursor-not-allowed"

}

`}

>

<Mic size={40}/>

<h2 className="
text-xl
font-semibold
">

Start Interview

</h2>

{

!interviewReady &&

<p className="
text-sm
text-gray-400
text-center
">

Upload a resume first

</p>

}

</motion.div>


{/* History */}

<motion.div

whileHover={{
scale:1.03
}}

onClick={()=>
navigate("/history")
}

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

<h2 className="
text-xl
font-semibold
">

Interview History

</h2>

</motion.div>

</div>


{/* Analytics */}

<div className="
grid
grid-cols-3
gap-6
mb-8
">

<div className="
p-6
rounded-3xl
bg-white/5
">

<p className="
text-gray-400
">

Interviews

</p>

<h1 className="
text-4xl
mt-3
">

12

</h1>

</div>


<div className="
p-6
rounded-3xl
bg-white/5
">

<p className="
text-gray-400
">

Average Score

</p>

<h1 className="
text-4xl
mt-3
">

78

</h1>

</div>


<div className="
p-6
rounded-3xl
bg-white/5
">

<p className="
text-gray-400
">

Best Score

</p>

<h1 className="
text-4xl
mt-3
">

92

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
mb-5
text-xl
font-semibold
">

Performance Trend

</h2>

<ResponsiveContainer>

<LineChart data={data}>

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

)

}

export default Dashboard;