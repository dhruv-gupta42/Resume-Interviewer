import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

function Landing(){

const navigate=useNavigate();

return(

<div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

<div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"/>

<div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"/>

<div className="flex flex-col items-center justify-center min-h-screen relative z-10">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
className="text-8xl font-bold text-center"
>

AI Resume Assistant

</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.5}}
className="mt-8 text-gray-400 text-2xl text-center max-w-2xl"
>

Upload your resume.  
Practice with AI.  
Improve your interview performance.

</motion.p>

<motion.button

whileHover={{scale:1.05}}
whileTap={{scale:.95}}

onClick={()=>navigate("/login")}

className="
mt-12
px-10
py-5
rounded-full
bg-white
text-black
font-bold
"

>

Get Started →

</motion.button>

</div>

</div>

)

}

export default Landing;