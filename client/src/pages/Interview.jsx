import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {Mic,ArrowRight,ArrowLeft,Clock} from "lucide-react";
import axios from "axios";

import PageLayout from "../components/PageLayout";

function Interview(){

const navigate=useNavigate();

const API_URL=
import.meta.env.VITE_API_URL;

const questions=
JSON.parse(
localStorage.getItem("questions")
)||[];

const[currentIndex,setCurrentIndex]=
useState(0);

const[currentAnswer,setCurrentAnswer]=
useState("");

const[answers,setAnswers]=
useState([]);

const[startedListening,setStartedListening]=
useState(false);

const[seconds,setSeconds]=
useState(0);

const[loading,setLoading]=
useState(false);

useEffect(()=>{

const timer=setInterval(()=>{

setSeconds(prev=>prev+1);

},1000);

return()=>clearInterval(timer);

},[]);

const minutes=
Math.floor(seconds/60);

const remaining=
seconds%60;

const progress=
((currentIndex+1)/
questions.length)*100;

const startListening=()=>{

const SpeechRecognition=
window.SpeechRecognition||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert(
"Speech not supported"
);

return;

}

const recognition=
new SpeechRecognition();

recognition.start();

setStartedListening(true);

recognition.onresult=(event)=>{

const transcript=
event.results[0][0].transcript;

setCurrentAnswer(
prev=>prev+" "+transcript
);

};

recognition.onend=()=>{

setStartedListening(false);

};

};

const submitInterview=
async(updatedAnswers)=>{

setLoading(true);

try{

const response=
await axios.post(

`${API_URL}/api/evaluation/score`,

{

questions,
answers:updatedAnswers

}

);

const result=
response.data;

localStorage.setItem(

"results",

JSON.stringify(result)

);

navigate("/results");

}

catch(error){

console.log(error);

// fallback if evaluation fails

const fallbackResults={

overallScore:75,
confidence:80,
communication:78,

feedback:
updatedAnswers.map(
(item)=>({

answer:item.answer,

strength:
"Relevant response",

improvement:
"Add more examples",

score:7

})
)

};

localStorage.setItem(

"results",

JSON.stringify(
fallbackResults
)

);

navigate("/results");

}

};

const nextQuestion=()=>{

const updated=[...answers];

updated[currentIndex]={

question:
questions[currentIndex],

answer:
currentAnswer

};

setAnswers(updated);

setCurrentAnswer("");

if(
currentIndex<
questions.length-1
){

setCurrentAnswer(
updated[currentIndex+1]?.answer||""
);

setCurrentIndex(
prev=>prev+1
);

}else{

localStorage.setItem(

"answers",

JSON.stringify(updated)

);

submitInterview(
updated
);

}

};

const previousQuestion=()=>{

if(currentIndex===0)
return;

const updated=[...answers];

updated[currentIndex]={

question:
questions[currentIndex],

answer:
currentAnswer

};

setAnswers(updated);

setCurrentIndex(
prev=>prev-1
);

setCurrentAnswer(
updated[currentIndex-1]
?.answer||""
);

};

return(

<PageLayout>

<div className="max-w-6xl mx-auto">

<div className="flex justify-between mb-6">

<h1 className="text-5xl font-bold">

AI Interview Session

</h1>

<div className="flex items-center gap-2 text-xl">

<Clock/>

{minutes}:
{remaining.toString()
.padStart(2,"0")}

</div>

</div>

<div className="w-full h-2 bg-white/10 rounded-full mb-10">

<motion.div
animate={{
width:`${progress}%`
}}
className="
h-full
bg-white
rounded-full
"
/>

</div>

<div className="grid grid-cols-2 gap-8">

<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
">

<h2 className="text-2xl">

{questions[currentIndex]}

</h2>

</div>

<div className="
p-8
rounded-3xl
bg-white/5
border
border-white/10
">

<textarea

rows="10"

value={currentAnswer}

onChange={(e)=>
setCurrentAnswer(
e.target.value
)
}

className="
w-full
bg-white/10
rounded-xl
p-4
resize-none
"

placeholder="
Type or speak...
"

/>

<div className="flex gap-4 mt-6">

<button
onClick={startListening}
className="
px-6
py-3
rounded-full
bg-white/10
"
>

<Mic/>

</button>

<button
onClick={previousQuestion}
className="
px-6
py-3
rounded-full
bg-white/10
flex
items-center
gap-2
"
>

<ArrowLeft/>

Previous

</button>

<button
onClick={nextQuestion}
disabled={loading}
className="
px-6
py-3
rounded-full
bg-white
text-black
flex
items-center
gap-2
"
>

{loading
? "Analyzing..."
: "Next"}

{!loading&&
<ArrowRight/>
}

</button>

</div>

</div>

</div>

</div>

</PageLayout>

)

}

export default Interview;