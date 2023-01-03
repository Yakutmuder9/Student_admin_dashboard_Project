import { useContext, useState } from "react";
import { ColorModeContext, tokens, useMode } from "../../theme";
import { useTheme, Box, IconButton, InputBase, useMediaQuery } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Badge from './Badge';
import CardHeader from '@mui/material/CardHeader';
import axios from 'axios';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth?.user);
  const [themeToggle, setThemeToggle] = useState(true)

  const toggleStatus = async () => {
    const themeStatus = { featured: themeToggle}
    fetch('http://localhost:5000/api/user/theme', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'patch',                                                              
      body: JSON.stringify( { featured: false } )                                        
    })
  }




  useEffect(() => {

  }, [dispatch, user])

  return (
    <Box display="flex" justifyContent="space-between" p={1} style={{ background: "#2d45fb" }}>
      <Box display="flex">

        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}

        <Box
          display={smScreen? "flex" : "none"}
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>

      </Box>

      <Box display="flex">
        <IconButton 
          onClick={() => {
            colorMode.toggleColorMode();
            toggleStatus();
          }}>
        {/* onClick={() => {
          colorMode.toggleColorMode; toggleStatus;}} */}
          
          {theme.palette.mode === "dark" ? (

            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>

        <CardHeader
          title={<span>{user?.firstName.replace(/^./, str => str.toUpperCase())}</span>}
          // title={<span>{user?.firstName.replace(/^./, str => str.toUpperCase())}</span>}
          subheader={user?.role}
          className="p-0 px-2 m-0"
        />
        <IconButton
          className="py-0 my-0 mx-2">
          {user ? <Badge user={user}
          /> : <PersonOutlinedIcon />}
        </IconButton>

        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>

    </Box>
  );
};

export default Topbar;


