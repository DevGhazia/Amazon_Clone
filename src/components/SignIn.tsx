import { Link, useNavigate } from "react-router"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { signInUser } from "../thunks/authThunks";
import ErrorBox from "./ErrorBox";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {user, loading, error} = useSelector((state: RootState)=> state.auth);

  function handleLogin(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    dispatch(signInUser({email, password}));
  }

  useEffect(()=>{ 
    if(user.userId) 
      navigate("/app");
  },[user.userId, navigate])

  return (
    <section className="mb-8">
      <div className="max-w-[350px] mx-auto">
        {error && <ErrorBox>{error}</ErrorBox>}
        <div className="px-5 py-3 mb-6 border border-lightGray rounded-lg">
          <h1 className="text-3xl mb-2">Sign in</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="font-bold text-sm">Email or mobile phone number</label>
            <input 
              id="email" 
              name="email" 
              value={email}
              type="text" 
              onChange={(e)=>{setEmail(e.target.value)}}
              autoComplete="email"
              required
              className="px-2 py-1 mt-1 mb-2 w-full text-sm bg-inputBlue border border-gray-600 rounded" 
            />
            <div className="flex justify-between">
              <label htmlFor="password" className="font-bold text-sm">Password</label>
              <Link to="" className="login_link" tabIndex={-1}><span className="text-sm">Forgot your password?</span></Link>
            </div>
            <input 
              id="password" 
              name="password" 
              value={password}
              type="password" 
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
              required
              className="px-2 py-1 mt-1 mb-4 w-full text-sm bg-inputBlue border border-gray-600 rounded" 
            />
            <button type="submit" disabled={loading} className="login_button bg-brightYellow mb-4 hover:bg-darkYellow disabled:bg-disabledYellow">Continue</button>
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
          <div><span className="font-bold text-sm">Buying for work?</span></div>
          <div className="mb-2">
            <Link to="" className="login_link"><span className="text-sm">Shop on Amazon Business</span></Link>
          </div>
        </div>
        <div className="border-t relative mb-5 border-lightGray">
          <span className="text-xs absolute -translate-x-1/2 left-1/2 -translate-y-1/2 px-1 bg-white text-mutedGray">New to Amazon?</span>
        </div>
        <button 
          onClick={()=>{navigate("/auth/signup")}} 
          className="login_button border border-darkGray hover:bg-gray-50">
            Create your own Amazon account
        </button>
      </div>
    </section>
  )
}

export default SignIn