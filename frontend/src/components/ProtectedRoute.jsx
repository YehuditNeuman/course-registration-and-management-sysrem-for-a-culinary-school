import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,role,to}) => {
    let currentUser=useSelector(state=>state.user.currentUser)
    if(!currentUser||currentUser.role!=role&&currentUser.role!="ADMIN")
        return <Navigate to={to} replace/>
    return children;
}
 
export default ProtectedRoute;