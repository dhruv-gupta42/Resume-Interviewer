import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function Login(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const navigate=useNavigate();

const login=async()=>{

try{

const response=await api.post(
"/auth/login",
{email,password}
);

localStorage.setItem(
"token",
response.data.token
);

navigate("/dashboard");

}catch{

alert("Login failed");

}

};

return(

<AuthLayout title="Welcome Back">

<input
className="w-full p-4 mb-4 rounded-xl bg-white/10 text-white border border-white/10 outline-none"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="w-full p-4 mb-6 rounded-xl bg-white/10 text-white border border-white/10 outline-none"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={login}
className="w-full p-4 rounded-xl bg-white text-black font-bold"
>
Login
</button>

<p className="text-gray-400 mt-5">

Don't have an account?{" "}

<Link
className="text-white"
to="/signup"
>
Sign up
</Link>

</p>

</AuthLayout>

)

}

export default Login;