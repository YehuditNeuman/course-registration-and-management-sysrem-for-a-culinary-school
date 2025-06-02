import { Router } from "express"; 
import{ addStudent_signUp, getAllStudents, getStudentById,getStudetByEmailPassword_Login,  loginWithGoogle, signUpWithGoogle, updateStudentById, updateStudentPasswordById } from "../controller/student.js"
import { chackToken, chackTokenForAdmin } from "../middlewares/chackToken.js";
const router=Router()
router.get("/",chackTokenForAdmin,getAllStudents)
router.get("/:id",chackToken,getStudentById)
router.post("/",addStudent_signUp)
router.post("/google",signUpWithGoogle)
router.put("/:id",chackToken,updateStudentById)
router.put("/password/:id",chackToken ,updateStudentPasswordById)
router.post("/login" ,getStudetByEmailPassword_Login)
router.post("/login/google" ,loginWithGoogle)

export default router;