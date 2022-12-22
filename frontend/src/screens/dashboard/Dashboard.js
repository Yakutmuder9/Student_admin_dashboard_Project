import "./dashboard.css";
import { Outlet } from "react-router-dom";
import SideNav from "./components/sidenav/Sidebar";
import Header from "./components/Header/Header";
import useRedirectLoggedOutUser from "./components/customHook/useRedirectLoggedOutUser";

const Dashboard = () => {
  // useRedirectLoggedOutUser("/");
  return (
    <div className="Dashboard vw-100 vh-100">
      <div className="d-flex w-100 h-100">
        <div className="leftSide d-none d-lg-block">
          <SideNav />
        </div>
        <div className="rightSide">
          <div className="w-100 shadow-lg dashheader">
            <Header />
          </div>
          <div className="w-100 dashMain">
            <div className="w-100 dashOutlet py-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
