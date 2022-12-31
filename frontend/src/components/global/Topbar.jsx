import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme, Box, IconButton, InputBase } from "@mui/material";
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

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {

  }, [dispatch, user])

  return (
    <Box display="flex" justifyContent="space-between" p={1} style={{background: "#544ee6"}}>
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
          display="flex"
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
        <IconButton onClick={colorMode.toggleColorMode}>
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
          title={<span>{user.firstName.replace(/^./, str => str.toUpperCase())}</span>}
          subheader={user.role}
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




// import React from "react";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import { useTheme, Box, IconButton, InputBase, Button, Avatar, AvatarGroup } from "@mui/material";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import { useProSidebar } from "react-pro-sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import Badge from './Badge';
// import CardHeader from '@mui/material/CardHeader';

// const Topbar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const colorMode = useContext(ColorModeContext);
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const dispatch = useDispatch()

//   const user = useSelector((state) => state.auth.user);
//   useEffect(() => {

//   }, [dispatch, user])


//   const role = user?.role
//   const imgStyle = {
//     border: `2px solid 
//     ${(role == 'superadmin')? '#BAFC5D': 
//     (role == 'instructor'? "#000" : "#fff")}`, 
//     width: '20px', 
//     height: '20px',
//     borderRadius: "50%"
//   }

//   return (
//     <Box display="flex" justifyContent="space-between" p={2} backgroundColor='primary'>
//       <Box display="flex">

//         {broken && !rtl && (
//           <IconButton
//             sx={{ margin: "0 6 0 2" }}
//             onClick={() => toggleSidebar()}
//           >
//             <MenuOutlinedIcon />
//           </IconButton>
//         )}

//         <Box
//           display="flex"
//           backgroundColor={colors.primary[400]}
//           p={0.2}
//           borderRadius={1}
//         >
//           <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
//           <IconButton type="button">
//             <SearchIcon />
//           </IconButton>
//         </Box>

//       </Box>

//       <Box display="flex">
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (

//             <LightModeOutlinedIcon />
//           ) : (
//             <DarkModeOutlinedIcon />
//           )}
//         </IconButton>
//         <IconButton>
//           <NotificationsOutlinedIcon />
//         </IconButton>

// <div></div>
//         {/* <CardHeader
//           title={<span>{user.firstName}</span>}
//           subheader={user.role}
//           sx={{ height: '0%', width: '0%', background: '#fff'}}
//         /> */}
//         <IconButton >
//           {/* {user ? <Badge user={user} /> : <PersonOutlinedIcon />} */}
//           <img src={user.profile_pic} style={imgStyle}/>
//         </IconButton>

//         {broken && rtl && (
//           <IconButton
//             sx={{ margin: "0 6 0 2" }}
//             onClick={() => toggleSidebar()}
//           >
//             <MenuOutlinedIcon />
//           </IconButton>
//         )}
//       </Box>

//     </Box>
//   );
// };

// export default Topbar;

