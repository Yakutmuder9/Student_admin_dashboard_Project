import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import ForgotPassword from './auth/forgotPass/ForgotPass';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import ResetPassword from './auth/resetPass/ResetPass';
import PrivateRoute from "../frontend/src/components/privateRoute/PrivateRoute";
// import HomeScreen from "./screens/visiters/HomePage"
import Loader from './components/loading/loader';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './redux/feature/auth/authService';
import { SET_LOGIN } from './redux/feature/auth/authSlice';
import Dashboard from './screens/dashboard/Dashboard';
// import DashActivity from './screens/dashboard/main/dashactive/DashActivity';
// import Course from "./screens/dashboard/main/course/Course";
// import Newcourse from "./screens/dashboard/main/course/Newcourse/Newcourse";
// import NewcourseDetail from "./screens/dashboard/main/course/Newcourse/SingleCourse";
// import Event from "./screens/dashboard/main/event/Event";
// import Cart from "./screens/dashboard/main/cart/Cart";
// import Profile from "./screens/dashboard/main/Profile/Profile";
// import Resources from "./screens/dashboard/main/resources/Resources";
// import Assessment from "./screens/dashboard/main/assesment/Assessment";
// import Inbox from "./screens/dashboard/main/Inbox/Inbox";
// import Support from "./screens/dashboard/main/support/Support";
// import ResourcesDetail from "./screens/dashboard/main/resources/ResourcesDetail";
// import Payment from "./screens/dashboard/main/payment/payment";

const App = () => {
    const [userRole, setUserRole] = useState("admin")
    const dispatch = useDispatch();

    useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();

            dispatch(SET_LOGIN(status));
        }
        loginStatus();
    }, [dispatch]);


    return (

        <div className="App">
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="resetpassword/:resetToken" element={<ResetPassword />} />


                <Route element={<PrivateRoute />}>
                    <Route path="*" element={<Loader />} />
                    <Route path="/" element={<Dashboard />}>
                        {/* <Route path="dashboard" exact element={<DashActivity />} />
            <Route path="course" element={<Course />} />
            <Route path="course/:id" element={<Course />} />
            <Route path="newcourse" element={<Newcourse />} />
            <Route path="newcourse/:id" element={<NewcourseDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="event" element={<Event />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:id" element={<ResourcesDetail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="support" element={<Support />} /> */}

                    </Route>
                </Route>
                <Route path="*" element={<Loader />} />
            </Routes>
        </div>
    )
}

export default App
