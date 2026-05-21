import {useEffect,useState} from "react";

import {useNavigate}
from "react-router-dom";

import PageLayout
from "../components/PageLayout";

import api
from "../services/api";

function History(){

const navigate=
useNavigate();

const [history,setHistory]=
useState([]);

useEffect(()=>{

const user=
JSON.parse(
localStorage.getItem(
"user"
)
);

async function load(){

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

console.log(
error
);

}

}

load();

},[]);

return(

<PageLayout>

<div className="
max-w-6xl
mx-auto
">

<h1 className="
text-5xl
font-bold
mb-10
">

Interview History

</h1>

<div className="
space-y-6
">

{

history.length===0

?

<div className="
p-12
rounded-3xl
bg-white/5
border
border-white/10
text-center
">

<h2 className="
text-3xl
mb-4
">

No interviews yet

</h2>

<p className="
text-gray-400
">

Complete your first AI interview and your reports will appear here.

</p>

<button

onClick={()=>
navigate(
"/upload"
)
}

className="
mt-6
px-8
py-3
rounded-full
bg-white
text-black
"

>

Upload Resume

</button>

</div>

:

history.map(
(item,index)=>(

<div

key={index}

className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
"

>

<h2 className="
text-2xl
font-semibold
mb-4
">

Score:
{item.overallScore}/100

</h2>

<p className="
mb-2
">

Confidence:
{item.confidence}%

</p>

<p className="
mb-2
">

Communication:
{item.communication}%

</p>

<p className="
text-gray-400
mt-4
">

{
new Date(
item.createdAt
).toLocaleDateString()
}

</p>

</div>

)

)

}

</div>

</div>

</PageLayout>

)

}

export default History;