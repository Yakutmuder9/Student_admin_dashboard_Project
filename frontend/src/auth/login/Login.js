import './login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userLogin } from '../../redux/feature/auth/authSlice'
import { SET_LOGIN, SET_NAME, SET_USER } from "../../redux/feature/auth/authSlice";
import Loader from "../../components/loading/Loading"
import { validateEmail, loginUser } from '../../redux/feature/auth/authService'


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const onSubmmitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("All fields are required");
        }

        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }

        const userData = {
            email,
            password,
        };
        setIsLoading(true);
        try {
            const data = await loginUser(userData);
            if (data) {
                dispatch(SET_LOGIN(true));
                dispatch(SET_NAME(data.firstName));

                dispatch(SET_USER(data));
                setIsLoading(false);
                navigate("/");
            } else {
                setIsLoading(false);
                navigate("/login");
            }

        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <>

            <div className="login">
                {isLoading && <Loader />}

                {/* animated-background */}
                <div className="login-back-animated" >
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div >

                {/* login-card */}
                <div className='login_card'>

                    <div className='login_profile'>
                        <img className='logo' src='logo.ico' />
                    </div>

                    <div className='login_desc mb-5'>
                        <h3>
                            Welcome back
                            <span> WKU <br></br>Student </span>
                            Dashboard
                        </h3>
                    </div>

                    <form onSubmit={onSubmmitHandler}>

                        <div className="form__group ">
                            <input type="text" className="form__input" id="username" placeholder="Username" required name="email" value={email} onChange={handleInputChange} />
                            <label htmlFor="username" className="form__label">Username</label>
                        </div>

                        <div className="form__group">
                            <input type="password" className="form__input" id="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange} autoComplete="off" />
                            <label htmlFor="password" className="form__label position-absolute" autoComplete="false">Password</label>

                            <div className='d-flex justify-content-between  my-1'>
                                <a href='register'>New User?</a>
                                <a href='forgotpassword'>Forgotten your password?</a>

                            </div>

                        </div>

                        <div className='submit_btn_container'>
                            <button type='submit' disabled={isLoading}>
                                {isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span></button>
                        </div>

                    </form>
                </div>

            </div>

        </>)
}

export default Login
