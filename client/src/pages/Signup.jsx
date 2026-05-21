import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import api from "../services/api";

function Signup(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const signup=async()=>{

try{

await api.post(
"/auth/register",
{
name,
email,
password
}
);

navigate("/login");

}catch(error){

alert("Signup failed");

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-[#050816]">

<div className="w-[400px] p-8 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10">

<h1 className="text-white text-4xl font-bold mb-8">

Create Account

</h1>

<input
className="w-full mb-4 p-4 rounded-xl bg-white/10 text-white"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="w-full mb-4 p-4 rounded-xl bg-white/10 text-white"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="w-full mb-6 p-4 rounded-xl bg-white/10 text-white"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={signup}
className="w-full p-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition"
>

Sign Up

</button>

<p className="text-gray-400 mt-5">

Already have an account?{" "}

<Link
className="text-white"
to="/login"
>

Login

</Link>

</p>

</div>

</div>

)

}

export default Signup;