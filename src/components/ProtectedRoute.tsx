import { useSelector } from "react-redux"
import { RootState } from "../store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const {loading, user} = useSelector((state: RootState)=> state.auth);
    if(loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-10 h-10 border-4 border-lightGray border-t-linkBlue rounded-full animate-spin"></div>
            </div>
    )
    return user.userId? <Outlet/> : <Navigate to="/auth/signin"/> 
}

export default ProtectedRoute;