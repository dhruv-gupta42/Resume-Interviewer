import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {Upload,FileText} from "lucide-react";

import PageLayout from "../components/PageLayout";
import api from "../services/api";

function UploadResume(){

const navigate=useNavigate();

const [file,setFile]=useState(null);
const [loading,setLoading]=useState(false);

const handleUpload=async()=>{

if(!file){

alert(
"Please select a PDF"
);

return;

}

try{

setLoading(true);

/* Clear previous interview session */

localStorage.removeItem(
"questions"
);

localStorage.removeItem(
"answers"
);

/* Create form data */

const formData=
new FormData();

formData.append(
"resume",
file
);

/* Upload PDF */

const uploadResponse=
await api.post(

"/resume/upload",

formData,

{
headers:{
"Content-Type":
"multipart/form-data"
}
}

);

/* Generate questions */

const aiResponse=
await api.post(

"/ai/questions",

{
resumeText:
uploadResponse.data.text
}

);

/* Save new questions */

localStorage.setItem(

"questions",

JSON.stringify(
aiResponse.data.questions
)

);

navigate(
"/dashboard"
);

}
catch(error){

console.log(error);

alert(
"Failed to process resume"
);

}
finally{

setLoading(false);

}

};

return(

<PageLayout>

<div className="
max-w-4xl
mx-auto
min-h-[70vh]
flex
items-center
justify-center
">

<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
w-full
p-10
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
"

>

<h1 className="
text-5xl
font-bold
mb-4
">

Upload Resume

</h1>

<p className="
text-gray-400
mb-10
">

Upload your resume and AI will generate interview questions.

</p>


<label
className="
cursor-pointer
block
"

>

<div className="
border-2
border-dashed
border-white/20
rounded-3xl
p-16
text-center
hover:border-white/50
transition
">

<FileText
size={60}
className="
mx-auto
mb-5
"
/>

{

file ?

<p className="
text-xl
">

{file.name}

</p>

:

<>

<p className="
text-xl
mb-2
">

Choose PDF Resume

</p>

<p className="
text-gray-400
">

Drag and drop or click

</p>

</>

}

</div>

<input

type="file"

accept=".pdf"

hidden

onChange={(e)=>{

setFile(
e.target.files[0]
);

}}

>

</input>

</label>


<button

onClick={handleUpload}

disabled={loading}

className="
w-full
mt-8
py-5
rounded-full
bg-white
text-black
font-semibold
flex
items-center
justify-center
gap-3
disabled:opacity-50
"

>

{

loading

?

<>

<div className="
w-5
h-5
border-2
border-black/30
border-t-black
rounded-full
animate-spin
"/>

Processing Resume...

</>

:

<>

<Upload/>

Generate Interview Questions

</>

}

</button>

</motion.div>

</div>

</PageLayout>

)

}

export default UploadResume;