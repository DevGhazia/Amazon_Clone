import logo from "../assets/amazon_logo.svg"
import { Link } from "react-router"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Login = () => {
  return (
    <div className="h-screen w-screen p-4">
      {/* ----Header---- */}
      <header className="mb-5">
        <img src={logo} className="max-h-8 object-contain mx-auto" alt="logo" />
      </header>

      {/* ----HERO SECTION----- */}
      <section className="mb-8">
        <div className="max-w-[350px] mx-auto">
          <div className="px-5 py-3 mb-6 border border-lightGray rounded-lg">
            <h1 className="text-[28px] mb-2">Sign in</h1>
            <form>
              <label htmlFor="email" className="font-semibold text-sm">Email or mobile phone number</label>
              <input id="email" name="email" type="text" className="px-2 py-1 mt-1 mb-3 w-full bg-inputBlue border border-gray-600 rounded-lg" />
              <button type="submit" className="login_button bg-brightYellow mb-4 hover:bg-darkYellow">Continue</button>
            </form>
            <p className="text-xs mb-3">
              By continuing, you agree to Amazon's <Link to="" className="login_link">
              <span className="underline">Conditions of Use</span></Link> and <Link to="" className="login_link">
              <span className="underline">Privacy Notice</span></Link>.
            </p>
            <div className="mb-5">
              <Link to="" className="login_link">
                <div className="flex items-center text-sm ml-[-05px]">
                  <KeyboardArrowDownIcon />
                  <span>Need help?</span>
                </div>
              </Link>
            </div>
            <hr className="border-t border-lightGray mb-3"/>
            <div><span className="font-semibold text-sm">Buying for work?</span></div>
            <div className="mb-2">
              <Link to="" className="login_link"><span className="text-sm">Shop on Amazon Business</span></Link>
            </div>
          </div>
          <div className="border-t relative mb-5 border-lightGray">
            <span className="text-xs absolute -translate-x-1/2 left-1/2 -translate-y-1/2 px-1 bg-white text-mutedGray">New to Amazon?</span>
          </div>
          <button className="login_button border border-darkGray hover:bg-gray-50">Create your own Amazon account</button>
        </div>
      </section>

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

export default Login