import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import ForgotPassword from './pages/auth/forgotPass/ForgotPass';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import ResetPassword from './pages/auth/resetPass/ResetPass';

import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Loader from './components/loading/dataFeaching/loader';

import Dashboard from './pages/dashboard/Dashboard.js';
import Dashactive from './pages/dashboard/dashactive/Dashactive';
import Course from "./pages/course/Course";
import Newcourse from "./pages/course/Newcourse/Newcourse";
import NewcourseDetail from "./pages/course/Newcourse/SingleCourse";
import Calender from "./pages/calender/Calender";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/Profile/Profile";
import Resources from "./pages/resources/Resources";
import Assessment from "./pages/assesment/Assessment";
import Inbox from "./pages/Inbox/Inbox";
import Support from "./pages/support/Support";
import ResourcesDetail from "./pages/resources/ResourcesDetail";
import Payment from "./pages/payment/payment";

const App = () => {
  const [theme, colorMode] = useMode();


  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetpassword/:resetToken" element={<ResetPassword />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />}>

                <Route path="dashboard" exact element={<Dashactive />} />
                <Route path="course" element={<Course />} />
                <Route path="course/:id" element={<Course />} />
                <Route path="newcourse" element={<Newcourse />} />
                <Route path="newcourse/:id" element={<NewcourseDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="payment" element={<Payment />} />
                <Route path="calender" element={<Calender />} />
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
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}

export default App
