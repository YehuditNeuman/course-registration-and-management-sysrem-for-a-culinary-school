import { Router } from "express"; 
import { addRegistration, cancelRegistration, getAllRegistrations, getregistrationsByStudentId, updateIsSuccessfullyCompleted } from "../controller/registration.js";
import { chackToken, chackTokenForAdmin } from "../middlewares/chackToken.js";

const router=Router()

router.get("/",chackTokenForAdmin,getAllRegistrations)
router.get("/student",chackToken,getregistrationsByStudentId)
router.post("/",chackToken,addRegistration)
router.delete("/:id",chackToken,cancelRegistration)
router.put("/:id",chackTokenForAdmin,updateIsSuccessfullyCompleted)



export default router;