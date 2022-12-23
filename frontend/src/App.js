import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import ForgotPassword from './auth/forgotPass/ForgotPass';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import ResetPassword from './auth/resetPass/ResetPass';
import PrivateRoute from "../frontend/src/components/privateRoute/PrivateRoute";
import Loader from './components/loading/loader';
import Dashboard from './pages/dashboard/Dashboard.js';
import DashActivity from './pages/dashboard/main/dashactive/DashActivity';
import Course from "./pages/dashboard/main/course/Course";
import Newcourse from "./pages/dashboard/main/course/Newcourse/Newcourse";
import NewcourseDetail from "./pages/dashboard/main/course/Newcourse/SingleCourse";
import Event from "./pages/dashboard/main/event/Event";
import Cart from "./pages/dashboard/main/cart/Cart";
import Profile from "./pages/dashboard/main/Profile/Profile";
import Resources from "./pages/dashboard/main/resources/Resources";
import Assessment from "./pages/dashboard/main/assesment/Assessment";
import Inbox from "./pages/dashboard/main/Inbox/Inbox";
import Support from "./pages/dashboard/main/support/Support";
import ResourcesDetail from "./pages/dashboard/main/resources/ResourcesDetail";
import Payment from "./pages/dashboard/main/payment/payment";

const App = () => {


  return (

    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetpassword/:resetToken" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="dashboard" exact element={<DashActivity />} />
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
            <Route path="support" element={<Support />} />
          </Route>
          <Route path="*" element={<Loader />} />
        </Route>
        <Route path="*" element={<Loader />} />
      </Routes>
    </div>
  )
}

export default App
