import { useState } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sidebarContext";

import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, Card, Button } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from "react-router-dom";
import TableChartIcon from '@mui/icons-material/TableChart';
import { useSelector } from "react-redux";
import { MdDashboard, MdLogout } from "react-icons/md";
import { logoutUser } from "../../../redux/feature/auth/authService";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location
  const splitLocation = pathname.split("/")[1]
  const user = useSelector((state) => state.auth?.user);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(`${splitLocation}`);
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();


  const handleLogout = async (e) => {
    e.preventDefault();
    try {

      await logoutUser();
      //  console.log(logoutstate);
      // localStorage.removeItem('user')
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log("error.message");
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        // backgroundColor="#1f252f"
        image={sidebarImage}
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Menu iconshape="square">

          <MenuItem
            id="logo-hover"
            icon={
              collapsed && (
                <MenuOutlinedIcon
                  onClick={() => collapseSidebar()} />
              )
            }

          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                mt="18px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <span style={{ background: "#2d45fb", color: "#fff", padding: "5px", borderRadius: "12%" }}>WKU</span><span> Dashboard</span>
                </Typography>

                <Card
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                  className="p-2"
                >
                  <KeyboardDoubleArrowLeftIcon />
                </Card>
              </Box>

            )}
          </MenuItem>






          <hr></hr>

          <Box paddingLeft={collapsed ? undefined : "5%"}>

            <Item
              title="Dashboard"
              to="/"
              icon={<MdDashboard />}
              selected={selected}
              setSelected={setSelected}
            />


            {user?.role == 'superadmin' ?
              <Item
                title="Financial & budgeting"
                to="#"
                icon={<TableChartIcon />}
                selected={selected}
                setSelected={setSelected}
              /> :
              <SubMenu
                icon={<PeopleOutlinedIcon />} label="Course"
                selected={selected}
                setSelected={setSelected}>
                <MenuItem to="/course" style={{ backgroundColor: `${colors.primary[400]}` }}> Maths </MenuItem>
                <MenuItem to="/course" style={{ backgroundColor: `${colors.primary[400]}` }}> English </MenuItem>
              </SubMenu>
            }

            {user?.role == 'superadmin' ? null :
              <Item
                title="Discussion"
                to="#"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />}

            <Item
              title={user?.role == 'superadmin' ? "Enrollment & record" : (user?.role == 'instructor' ? 'Attendance and grading' : 'Grades & Progress')}
              to={user?.role == 'superadmin' ? "#" : ((user?.role == 'instructor') ? '#' : '#')}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {user?.role == 'superadmin' ?
              <Item
                title="Comminication"
                to="#"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> : null}

            <Item
              title={user?.role == 'student' ? "Financial aid & billing" : 'Professional development resources'}

              to={user?.role == 'student' ? "#" : '#'}
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Comminication"
              to="#"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Calender"
              to="/calender"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Announcements"
              to="#"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />



            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>

            {user?.role == 'superadmin' ?
              <Item
                title="Data Visualization"
                to="#"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> :
              <Item
                title="assessment"
                to="/assessment"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />}


            {user?.role == 'superadmin' ?
              <Item
                title="Campus Facilities"
                to="#"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> :
              <Item
                title="Resources"
                to="/resources"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />}

            <Item
              title="profile"
              to="/profile"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Managment
            </Typography>

            {user?.role == 'superadmin' ? <>
              <Item
                title="HR systems"
                to="#"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Employee Directories"
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Scheduling Tools"
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Maintenance Request "
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </> : <>
              <Item
                title="Course Materials"
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> <Item
                title="Assessments and Quizzes"
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Support"
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /></>
            }


            <Item
              title="Office Hours"
              to="#"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Box>
              <Item
                title="Log out"
                icon={<MdLogout />}
                selected={selected}
                setSelected={setSelected}
                className='position-relative'
              >
              </Item>
              <Button
                onClick={handleLogout} className="btn w-100  bg-danger position-absolute" sx={{zIndex: 99}}>dsdsd
              </Button>
            </Box>

          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
