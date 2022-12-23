import { useState, useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Button } from "reactstrap";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import './sideNav.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logoutUser } from "../../../../redux/feature/auth/authService";

const Sidebar = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState([]);
    const [menuCollapse, setMenuCollapse] = useState(false);

    const menuIconClick = () => {
        setMenuCollapse(!menuCollapse);
    };


    // useEffect(() => {
    //   const getUsers = async () => {
    //     const data = await getDocs(courseaEnrolledRef);
    //     setDropdown(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   };

    //   getUsers();
    // }, []);


    const handleLogout = async (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues));
        // setIsSubmit(true);
        try {
            await logoutUser();
            localStorage.removeItem('user')
            navigate("/");
        } catch (error) {
            console.log("error.message");
        }
    };
    return (
        <div className={menuCollapse ? "sideNavCollapsed" : "sideNavOpend "}>
            <ProSidebarProvider
                collapsed={menuCollapse} id='prosliderContainer' className="bg-transparent p-0">
                <aside className="navbar-aside">
                    <div className="aside-top w-100">
                        <Link to="/dashboard" className="brand-wrap text-decoration-none">
                            <header className=" overflow-hidden">
                                <div className="logotext ">
                                    <div>
                                        {menuCollapse ? (
                                            <div className="col shadow d-block" id="DashboardLogo">
                                                <img src='logo.ico' className="w-100 h-100  ps-2 text-center overflow-hidden" />
                                            </div>
                                        ) : (
                                            <div
                                                className="col shadow overflow-hidden d-flex h-100 w-100"
                                                id="DashboardLogo"
                                            ><img src="logo.ico" className="openlogo overflow-hidden ps-2" />
                                                <h3 className="pt-3 pb-2 bolder overflow-hidden ">
                                                    ashboard
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </header>
                        </Link>
                    </div>

                    <nav>
                        <ul className="menu-aside ps-3 pt-2 w-100" id="sideNavBtn">

                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/dashboard"
                                >
                                    {menuCollapse ?
                                        <i className="
                 material-icons ">dashboard</i> : <><i className="material-icons pe-3">dashboard</i><span className="text">Dashboard</span></>}
                                </NavLink>
                            </li>

                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/course"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons"> bookmark </span> : <><span className="material-icons me-3"> bookmark </span><span className="text">Course</span></>}
                                </NavLink>
                            </li>


                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/event"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">move_to_inbox</span> : <><span className="material-icons me-3">move_to_inbox</span><span className="text">Event</span></>}
                                </NavLink>
                            </li>
                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/assessment"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">event</span> : <><span className="material-icons me-3">event</span><span className="text">Asessment</span></>}
                                </NavLink>
                            </li>
                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/resources"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">move_to_inbox</span> : <><span className='material-icons me-3'>task</span><span className="text">Resources</span></>}
                                </NavLink>
                            </li>
                            {menuCollapse ? <h6
                                className="w-100  overflow-hidden ps-2  my-3"
                                id="acountDetailTx"
                                variant="white"
                            >Acc<br></br> Deti
                            </h6> : <h6 className="w-100 ps-3 my-3">Account Detial</h6>}
                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/inbox"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">library_books</span> : <><span className="material-icons me-3">library_books</span><span className="text">Inbox</span></>}
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/profile"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">account_circle</span> : <><span className="material-icons me-3">account_circle</span><span className="text">Profile</span></>}
                                </NavLink>
                            </li>
                            <li className="menu-item mt-5">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/support"
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">help</span> : <><span className="material-icons me-3">help</span><span className="text">Support</span></>}
                                </NavLink>
                            </li>
                            <li className="menu-item ">
                                <NavLink
                                    className="menu-link text-light d-flex align-items-center"
                                    to="/" onClick={handleLogout}
                                >
                                    {menuCollapse ?
                                        <span className="material-icons">logout</span> : <><span className="material-icons me-3">logout</span><span className="text">Log Out</span></>}
                                </NavLink>
                            </li>
                        </ul>
                        <br />
                        <br />
                    </nav>
                </aside>
            </ProSidebarProvider >
            <div className={menuCollapse ? "sidebarCloseToggler text-end pe-3 text-light py-1" : "sidebarOpenToggler text-end pe-3 text-light py-1"} onClick={menuIconClick}>
                {menuCollapse ? <FiArrowRight /> : <FiArrowLeft />}
            </div>
        </div>
    );
};

export default Sidebar;
