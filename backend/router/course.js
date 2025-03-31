import { Router } from "express"; 
import{ addCourse, deleteCourseById, getAllCategories, getAllCourses, getCourseById, numPages, updateCourseById } from "../controller/course.js"
import {uploadImage}  from "../middlewares/files.js"
import {chackTokenForAdmin} from "../middlewares/chackToken.js";
const router=Router()
router.get("/",getAllCourses)
router.get("/total",numPages)
router.get("/categories",getAllCategories)
router.get("/:id",getCourseById)
router.delete("/:id",chackTokenForAdmin,deleteCourseById)
router.put("/:id",chackTokenForAdmin,updateCourseById)
router.post("/",chackTokenForAdmin ,uploadImage,addCourse)

export default router;