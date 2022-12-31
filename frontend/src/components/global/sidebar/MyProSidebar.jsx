import { useState } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sidebarContext";

import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, Card } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
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
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useLocation } from "react-router-dom";


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
  const location = useLocation();
  const { pathname } = location
  const splitLocation = pathname.split("/")[1]

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(`${splitLocation}`);
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    // <Box
    //   // sx={{
    //   //   position: "sticky",
    //   //   display: "flex",
    //   //   height: "100vh",
    //   //   top: 0,
    //   //   bottom: 0,
    //   //   zIndex: 10000,
    //   //   "& .sidebar": {
    //   //     border: "none",
    //   //   },
    //   //   "& .menu-icon": {
    //   //     backgroundColor: "transparent !important",
    //   //   },
    //   //   "& .menu-item": {
    //   //     // padding: "5px 35px 5px 20px !important",
    //   //     backgroundColor: "transparent !important",
    //   //   },
    //   //   "& .menu-anchor": {
    //   //     color: "inherit !important",
    //   //     backgroundColor: "transparent !important",
    //   //   },
    //   //   "& .menu-item:hover": {
    //   //     color: `${colors.blueAccent[500]} !important`,
    //   //     backgroundColor: "transparent !important",
    //   //   },
    //   //   "& .menu-item.active": {
    //   //     color: `${colors.greenAccent[500]} !important`,
    //   //     backgroundColor: "transparent !important",
    //   //   },
    //   // }}
    // >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        // backgroundColor="#1f252f"
        image={sidebarImage}
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
                  <span >WKU Dash</span>
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

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            
              <Item
                title="dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

            <SubMenu
              icon={<PeopleOutlinedIcon />} label="Charts"
              selected={selected}
              setSelected={setSelected}>
              <MenuItem style={{ backgroundColor: `${colors.primary[400]}` }}> Pie charts </MenuItem>
              <MenuItem style={{ backgroundColor: `${colors.primary[400]}` }}> Line charts </MenuItem>
            </SubMenu>
            <Item
              title="Manage Team"
              to="/course"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >

            </Item>

            <Item
              title="calender"
              to="/calender"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="inbox"
              to="/inbox"
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

            <Item
              title="assessment"
              to="/assessment"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="resources"
              to="/resources"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

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
              Charts
            </Typography>

            <Item
              title="support"
              to="/support"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />




            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    // </Box>
  );
};

export default MyProSidebar;
