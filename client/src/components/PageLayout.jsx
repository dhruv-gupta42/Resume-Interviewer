import PageTransition from "./PageTransition";

function PageLayout({children}){

return(

<div className="
min-h-screen
bg-[#050816]
text-white
p-10
">

<div className="
max-w-7xl
mx-auto
">

<PageTransition>

{children}

</PageTransition>

</div>

</div>

)

}

export default PageLayout;