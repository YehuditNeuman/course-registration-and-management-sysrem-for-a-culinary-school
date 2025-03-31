import { Router } from "express"; 
import{ addStudent_signUp, getAllStudents, getStudentById, getStudetByUserNamePassword_Login, updateStudentById, updateStudentPasswordById } from "../controller/student.js"
import { chackToken, chackTokenForAdmin } from "../middlewares/chackToken.js";
const router=Router()
router.get("/",chackTokenForAdmin,getAllStudents)
router.get("/:id",chackToken,getStudentById)
router.post("/",addStudent_signUp)
router.put("/:id",chackToken,updateStudentById)
router.put("/password/:id",chackToken ,updateStudentPasswordById)
router.post("/login" ,getStudetByUserNamePassword_Login)

export default router;