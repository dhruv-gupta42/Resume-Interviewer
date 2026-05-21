const express=require("express");

const router=express.Router();

const {
evaluateAnswers
}=require("../controllers/evaluationController");

router.post(
"/score",
evaluateAnswers
);

module.exports=router;