import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router"
import { signUpUser } from "../thunks/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ErrorBox from "./ErrorBox";

const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user, loading, error} = useSelector((state: RootState)=> state.auth)
    const navigate = useNavigate();
    
    const [formData, setFormDate] = useState({
        username: "",
        email: "",
        password: "",
        repassword: ""
    })

    function HandleSubmit(event: React.FormEvent){
        event.preventDefault();
        if(!formData.username || !formData.email || !formData.password || !formData.repassword){
            alert("Please fill all fields!");
            return;
        }
        if(formData.password != formData.repassword){
            alert("Password do not match!");
            return;
        }
        dispatch(signUpUser({
            email: formData.email,
            password: formData.password,
            username: formData.username
        }));
    }

    function HandleFormChange(event: React.ChangeEvent<HTMLInputElement>){
        setFormDate(prev=>({
            ...prev,
            [event.target.name] : event.target.value 
        }))
    }

    useEffect(()=>{
        if(user.userId)
            navigate("/app");            
    }, [user.userId, navigate]);

    return (
        <section className="mb-8">
        <div className="max-w-[350px] mx-auto">
            {error && <ErrorBox>{error}</ErrorBox>}
            <div className="px-5 py-3 mb-6 border border-lightGray rounded-lg">
            <h1 className="text-3xl mb-2">Create Account</h1>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="username" className="font-bold text-sm">Your name</label>
                <input 
                id="username" 
                name="username" 
                type="text" 
                value={formData.username}
                onChange={HandleFormChange}
                autoComplete="username"
                required
                className="px-2 py-1 mt-1 mb-2 w-full text-sm bg-inputBlue border border-gray-600 rounded" 
                />
                <label htmlFor="email" className="font-bold text-sm">Email or mobile phone number</label>
                <input 
                id="email" 
                name="email" 
                type="text" 
                value={formData.email}
                onChange={HandleFormChange}
                autoComplete="email"
                required
                className="px-2 py-1 mt-1 mb-2 w-full text-sm bg-inputBlue border border-gray-600 rounded" 
                />
                <label htmlFor="password" className="font-bold text-sm">Password</label>
                <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={HandleFormChange}
                autoComplete="new-password"
                required
                className="px-2 py-1 mt-1 mb-4 w-full text-sm bg-inputBlue border border-gray-600 rounded" 
                />
                <label htmlFor="repassword" className="font-bold text-sm">Re-enter password</label>
                <input 
                id="repassword" 
                name="repassword" 
                type="password" 
                value={formData.repassword}
                onChange={HandleFormChange}
                autoComplete="new-password"
                required
                className="px-2 py-1 mt-1 mb-0.5 w-full text-sm bg-inputBlue border border-gray-600 rounded" 
                />
                <span className="text-xs px-1 bg-white text-mutedGray">Passwords must be at least 6 characters.</span>
                <button type="submit" disabled={loading} className="login_button bg-brightYellow mt-2 mb-4 hover:bg-darkYellow disabled:bg-disabledYellow">Continue</button>
            </form>
            <p className="text-xs mb-3">
                By creating an account, you agree to Amazon's <Link to="" className="login_link">
                <span className="underline">Conditions of Use</span></Link> and <Link to="" className="login_link">
                <span className="underline">Privacy Notice</span></Link>.
            </p>
            <div className="mb-5">
                <Link to="" className="login_link">
                </Link>
            </div>
            <hr className="border-t border-lightGray mb-3"/>
            <div><span className="font-bold text-sm">Buying for work?</span></div>
            <div className="mb-2">
                <Link to="" className="login_link"><span className="text-sm">Shop on Amazon Business</span></Link>
            </div>
            </div>
            <div className="border-t relative mb-5 border-lightGray">
            <span className="text-xs absolute -translate-x-1/2 left-1/2 -translate-y-1/2 px-1 bg-white text-mutedGray">Already have an account?</span>
            </div>
            <button onClick={()=>{navigate("/auth/signin")}} className="login_button border border-darkGray hover:bg-gray-50">Sign In to your account</button>
        </div>
        </section>
    )
}

export default SignUp