import { Routes, Route } from "react-router"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import AuthLayout from "./components/AuthLayout"
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"
import { checkAuthStatus } from "./thunks/authThunks"
import HomePageLayout from "./components/HomePageLayout"
import { ProductPage } from "./components/ProductPage"
import SearchProductPage from "./components/SearchProductPage"
import ProductCategoryPage from "./components/ProductCategoryPage"
import DisplayCart from "./components/DisplayCart"
import { Navigate } from "react-router"

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/signin" replace />} />
      <Route path="/auth" element={<AuthLayout/>}>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signup" element={<SignUp/>}/>
      </Route>
      <Route path="/app" element={<HomePageLayout/>}>
        <Route element={<ProtectedRoute/>}>
          <Route index element={<Home/>}/>
          <Route path="search" element={<SearchProductPage />}/>
          <Route path=":category" element={<ProductCategoryPage/>}/>
          <Route path=":category/:productName/:itemId" element={<ProductPage/>}/>
          <Route path="cart" element={<DisplayCart/>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
