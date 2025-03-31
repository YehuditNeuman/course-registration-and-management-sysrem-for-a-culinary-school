import { Route, Routes } from "react-router-dom";

import CourseList from "../pages/CourseList";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import CheckOut from "../pages/CheckOut";
import LogIn from "../pages/LogIn";
import AddCourse from "../pages/AddCourse";
import CourseDetails from "./CourseDetails";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";


const Router = () => {
    return (  
        <Routes>
           
            <Route path="courseList" element={<CourseList/>}>
            <Route path="courseDetails/:courseId" element={<CourseDetails />} />
            </Route>
            <Route path="cart" element={<Cart/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="CheckOut" element={<ProtectedRoute children={<CheckOut/>} role={"USER"} to={"/login"}/>}/>
            <Route path="login" element={<LogIn/>}/>
            <Route path="addCourse" element={<ProtectedRoute children={<AddCourse/>} role={"ADMIN"} to={"/"}/>}/>
             <Route path="*" element={<HomePage/>}/>
        </Routes>
    );
}
 
export default Router;