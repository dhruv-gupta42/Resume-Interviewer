import { useNavigate } from "react-router-dom";

export default function Results(){

const navigate=useNavigate();

const results=JSON.parse(
localStorage.getItem("results")
);

if(!results){

return(

<div className="min-h-screen bg-[#020617] flex flex-col justify-center items-center text-white">

<h1 className="text-5xl font-bold mb-4">
No Results Found
</h1>

<p className="text-gray-400 mb-8">
Complete an interview to view your report.
</p>

<button
onClick={()=>navigate("/dashboard")}
className="bg-white text-black px-6 py-3 rounded-full"
>

Back To Dashboard

</button>

</div>

);

}

return(

<div className="min-h-screen bg-[#020617] text-white p-10">

<h1 className="text-6xl font-bold mb-10">
Interview Report
</h1>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-[#0f172a] p-8 rounded-3xl">
<p className="text-gray-400">
Overall Score
</p>

<h2 className="text-5xl font-bold">

{results.overallScore}/100

</h2>

</div>

<div className="bg-[#0f172a] p-8 rounded-3xl">
<p className="text-gray-400">

Confidence

</p>

<h2 className="text-5xl font-bold">

{results.confidence}%

</h2>

</div>

<div className="bg-[#0f172a] p-8 rounded-3xl">

<p className="text-gray-400">

Communication

</p>

<h2 className="text-5xl font-bold">

{results.communication}%

</h2>

</div>

</div>

<div className="bg-[#0f172a] mt-10 rounded-3xl p-8">

<h2 className="text-3xl font-bold mb-6">
Detailed Feedback
</h2>

{results.feedback?.map((item,index)=>(

<div
key={index}
className="mb-6 border-b border-gray-700 pb-6"
>

<h3 className="font-bold mb-2">

Question {index+1}

</h3>

<p>

<strong>Your Response:</strong>

{item.answer}

</p>

<p>

<strong>Strength:</strong>

{item.strength}

</p>

<p>

<strong>Improve:</strong>

{item.improvement}

</p>

<p>

<strong>Score:</strong>

{item.score}/10

</p>

</div>

))}

</div>

</div>

);

}