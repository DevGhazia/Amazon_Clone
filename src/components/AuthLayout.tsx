import { Outlet, Link } from "react-router"
import logo from "../assets/amazon_logo.svg"

const AuthLayout = () => {
  return (
    <div className="h-screen w-screen p-4">
      {/* ----Header---- */}
      <header className="mb-5">
        <img src={logo} className="max-h-8 object-contain mx-auto" alt="logo" />
      </header>

      {/* ----HERO SECTION----- */}
      <Outlet/>

      {/* ---- DIVIDER ---- */}
      <hr className="border-t-2 mb-10 border-lightGray"/>

      {/* ---- FOOTER ----- */}
      <footer>
        <div className="max-w-[270px] mx-auto">
          <div className="flex justify-between mb-3">
            <Link to="" className="login_link"><span>Conditions of Use</span></Link>
            <Link to="" className="login_link"><span>Privacy Notice</span></Link>
            <Link to="" className="login_link"><span>Help</span></Link>
          </div>
          <p className="text-xs text-center text-mutedGray">© 1996-2025, Amazon.com, Inc. or its affiliates</p>
        </div>
      </footer>
    </div> 
  )
}

export default AuthLayout