const express=
require("express");

const router=
express.Router();

const {
getHistory
}=require(
"../controllers/interviewController"
);

router.get(
"/history/:userId",
getHistory
);

module.exports=
router;