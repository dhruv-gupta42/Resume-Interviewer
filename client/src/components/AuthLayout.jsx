function AuthLayout({title,children}){

return(

<div className="min-h-screen bg-[#050816] relative overflow-hidden">

<div className="absolute inset-0">

<div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]" />

<div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />

</div>

<div className="relative z-10 min-h-screen flex items-center justify-center">

<div className="w-[420px] p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

<h1 className="text-white text-4xl font-bold mb-8">

{title}

</h1>

{children}

</div>

</div>

</div>

)

}

export default AuthLayout;