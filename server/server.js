require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const aiRoutes=require("./routes/aiRoutes");
const evaluationRoutes=
require("./routes/evaluationRoutes");

const app=express();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo Connected"))
.catch(err=>console.log(err));

const authRoutes=require("./routes/authRoutes");
const resumeRoutes=require("./routes/resumeRoutes");
const interviewRoutes=require("./routes/interviewRoutes");
app.use(
"/api/interviews",
interviewRoutes
);

app.use("/api/auth",authRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/evaluation",evaluationRoutes);

app.get("/",(req,res)=>{
    res.send("API Running");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});