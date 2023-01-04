import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Paper,
    Button,
    IconButton,
    Avatar,
    Card
} from "@mui/material";
import {
    ExpandMore, NotificationsNone
    , MarkChatUnread, DownloadOutlined, Analytics, Stars, Groups
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import { styled } from '@mui/material/styles';
import { mockTransactions } from "../../../data/mockData";
import Header from "../../../components/header/Header";

import { useContext, useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { InputBase } from "@mui/material";
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
import Topbar from "../../../components/global/Topbar";
import { MdLogout } from "react-icons/md";
import { MixedBargraph, SpinnChart } from "./SpinnChart";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Dashactive = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const mdScreen = useMediaQuery(theme.breakpoints.up("md"));
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { toggleSidebar, broken, rtl } = useProSidebar();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth?.user);
    const [themeToggle, setThemeToggle] = useState(true)

    const toggleStatus = async () => {
        const themeStatus = { featured: themeToggle }
        fetch('http://localhost:5000/api/user/theme', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'patch',
            body: JSON.stringify({ featured: false })
        })
    }



    useEffect(() => {

    }, [dispatch, user])

    return (
        <div className="analytics-activity-dashboard ">
            <Grid container>
                <Grid p="2%" item xs={12} md={8}
                >

                    <Grid display="flex" justifyContent="space-between"
                    >
                        <Header title="Dashboard" subtitle="Welcome to your dashboard" />

                        <Box w={100} display={mdScreen ? "flex" : "none"} alignItems="start">
                            <Box display="flex">
                                <IconButton
                                    onClick={() => {
                                        colorMode.toggleColorMode();
                                        toggleStatus();
                                    }}>

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

                    </Grid>

                    <Grid container display="flex" justifyContent="space-between" spacing={2}>
                        <Grid item xs={6} sm={4}>
                            <Card sx={{ height: "70px" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ backgroundColor: colors.blueAccent[100] }}>
                                            <Analytics />
                                        </Avatar>
                                    }
                                    title="Overall Engagment"
                                    subheader="16h / Weekly"
                                />
                            </Card></Grid>

                        <Grid item xs={6} sm={4}>
                            <Card sx={{ height: "70px" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ backgroundColor: colors.blueAccent[100] }}>
                                            <Stars />
                                        </Avatar>
                                    }
                                    title="Point Score"
                                    subheader="568"
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <Card sx={{ height: "70px" }}>
                                <CardHeader
                                    avatar={

                                        <Avatar sx={{ backgroundColor: colors.blueAccent[100], fontSize: "60px" }}>
                                            <Groups />
                                        </Avatar>
                                    }
                                    title="Rank Score"
                                    subheader="235"
                                />
                            </Card>
                        </Grid>
                    </Grid>
                {/* ---- Active hours */}
                    <Grid container display={smScreen ? "flex" : "block"} spacing={1} mt={1}  >
                        <Grid item xs={12} sm={7} >

                            <Box >
                                <Card className="p-3" sx={{ height: '320px' }}>
                                    Active Hours
                                    <MixedBargraph />
                                </Card>
                                <Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Box >
                                <Card className="p-3" sx={{ height: '320px' }}>
                                    Performance
                                </Card>

                            </Box>
                        </Grid>
                    </Grid>

                {/*------- Enrolled Class */}
                    <Grid container display={smScreen ? "flex" : "block"} spacing={1} mt={1}>

                        <Grid item xs={12} sm={7} >
                            <Box >
                                <Card className="p-3" sx={{ height: '330px' }}>
                                    Enrolled Class
                                </Card>

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <Box >
                                <Card className="p-3" sx={{ height: '240px' }}>
                                    <SpinnChart />
                                </Card>

                            </Box>


                            <Box >
                                <Card className="mt-2 p-3" sx={{ height: '82px' }}>
                                    Enrolled Class
                                </Card>

                            </Box>
                        </Grid>
                    </Grid>


                </Grid>


                <Grid p={2} item xs={12} md={4}
                    sx={{
                        // backgroundColor: colors.blueAccent[100],
                        // backgroundColor: "#99DAFF",
                        color: colors.grey[500],
                        fontSize: "14px",
                        backdropFilter: "blur(8px)",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                >


                    {/* Analytics searsh and logout button conatiner */}

                    <Grid mb={3} mt={2} xs={12}
                        display={smScreen ? "flex" : "none"} justifyContent="space-between">
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
                        <Box>
                            <Button
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                }}
                            >
                                <MdLogout sx={{ mr: "10px", me: 2 }} />
                                Log Out
                            </Button>
                        </Box>
                    </Grid>


                    {/* Analytics right side container  */}
                    <Grid container display={mdScreen ? "block" : "flex"} spacing={2}>
                        <Grid item xs={6} md={12}>
                            <Box className="mt-2">
                                <Box>
                                    Upcommig Events
                                </Box>
                                <Card className="mt-2 p-2" sx={{ height: '220px' }}>
                                    Upcommig Events
                                </Card>

                            </Box>
                        </Grid>

                        <Grid item xs={6} md={12}>
                            <Box className="" sx={{ height: '240px' }}>
                                <Box>
                                    Assignments
                                </Box>
                                <Card className="mt-2 p-2" sx={{ height: '220px' }}>
                                    Upcommig Assignments
                                </Card>

                            </Box>
                        </Grid>

                        <Grid item xs={6} md={12}>
                            <Box sx={{color: colors.grey[500]}}>
                                Notification
                                <Box>
                            </Box>
                                <Card className="mt-2 p-3" sx={{ height: '190px' }}>
                                    Notification
                                </Card>

                            </Box>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </div >

    )
}

export default Dashactive





const Dashactivex = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    return (
        <div>
            {/* <CourseCarosel /> */}
            {/* <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box> */}

            {/* GRID & CHARTS */}
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                    </Box>
                </Grid>



                <Grid
                    xs={12}
                    sm={12}
                    md={8}
                    lg={8}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid xs={12}>
                        <Item>
                            <Box backgroundColor={colors.primary[400]}>
                                <Box
                                    mt="25px"
                                    p="15px 30px"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.grey[100]}
                                        >
                                            Revenue Generated
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.greenAccent[500]}
                                        >
                                            $58,373,698
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton>
                                            <DownloadOutlinedIcon
                                                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box height="250px" m="-20px 0 0 0">
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid xs={12} sm={12} md={6}><Item>
                        <Box backgroundColor={colors.primary[400]} p="30px">
                            <Typography variant="h5" fontWeight="600">
                                Campaign
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                mt="25px"
                            >
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    sx={{ mt: "15px" }}
                                >
                                    $48,352 revenue generated
                                </Typography>
                                <Typography>
                                    Includes extra misc expenditures and costs
                                </Typography>
                            </Box>
                        </Box></Item>
                    </Grid>
                    <Grid xs={12} sm={12} md={6}><Item>
                        <Box backgroundColor={colors.primary[400]}>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ padding: "30px 30px 0 30px" }}
                            >
                                Sales Quantity
                            </Typography>
                            <Box height="250px" mt="-20px">
                            </Box>
                        </Box></Item>
                    </Grid>
                    <Grid xs={12}><Item>
                        <Box backgroundColor={colors.primary[400]} padding="30px">
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                sx={{ marginBottom: "15px" }}
                            >
                                Geography Based Traffic
                            </Typography>
                            <Box height="200px">
                            </Box>
                        </Box></Item>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} xl={4}><Item>
                    <Box
                        backgroundColor={colors.primary[400]}
                        maxHeight="100vh"
                        overflow="auto"
                        m="25px 0 0 0"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            color={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Resent Transaction
                            </Typography>
                        </Box>
                        {mockTransactions.map((transaction, i) => {
                            return (
                                <Box
                                    key={`${transaction}-${i}`}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderBottom={`4px solid ${colors.primary[500]}`}
                                    p="15px"
                                >
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            color={colors.greenAccent[100]}
                                        >
                                            {transaction.txId}
                                        </Typography>
                                        <Typography color={colors.grey[100]}>
                                            {transaction.user}
                                        </Typography>
                                    </Box>
                                    <Box color={colors.grey[100]}>{transaction.date}</Box>
                                    <Box
                                        color={colors.greenAccent[500]}
                                        p="5px 10px"
                                        borderRadius="4px"
                                    >
                                        ${transaction.cost}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box></Item>
                </Grid>
            </Grid> */}
        </div>
    )
}

















{/* <Box
className="analytics-activity-dashboard bg-dark d-flex align-items-center justify-content-between">

<Box m="20px">

    <div className="analytics-title d-flex align-items-center justify-content-between">
        <div className="bg-warning w-100">
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                    <Item>xs=6 md=8</Item>
                    <Item>xs=6 md=8</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </div>


        <div className="bg-secondary w-100">
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </div>

    </div>


    <div className="rounded ">
        <div className="analytics-title d-flex align-items-center justify-content-between">
            <div className="anatlytics-txt">
                <h2>Analytics Dashboard</h2>
                <span>January 1, Sunday</span>
            </div>
            <div className="anatlytics-icons  d-flex align-items-center justify-content-between">
                <NotificationsNone />
                <MarkChatUnread />
            </div>
        </div>

        <div className="engagement-cards d-flex align-items-center justify-content-between">
            <div className="">
                <div className="engamen-card-icon"></div>
                <div className="engamen-card-text">
                    <p>overall Engagment</p>
                    <h5>12h/Weekly</h5>
                </div>
            </div>
            <div className="">
                <div className="engamen-card-icon"></div>
                <div className="engamen-card-text">
                    <p>overall Engagment</p>
                    <h5>12h/Weekly</h5>
                </div>
            </div>
            <div className="">
                <div className="engamen-card-icon"></div>
                <div className="engamen-card-text">
                    <p>overall Engagment</p>
                    <h5>12h/Weekly</h5>
                </div>
            </div>
        </div>

        <div className="activity-performace-conatainer d-flex align-items-center justify-content-between">
            <div className="active-hour-performance">
                <div className=" active-hours">
                    <div className="card-title">
                        <h5>Activity Hours</h5>
                        <select name="listing" id="listing" class="drop-down-menu input">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>

                <div className=" active-hours-graph-container ">
                    <div className="active-graph">
                        graph gooese here..
                    </div>
                    <div className="lisit-active-hours">
                        <div className="time-spent-card">
                            <p>Time Spent</p>
                            <h6>15 <span>73%</span></h6>
                        </div>
                        <div className="time-spent-card">
                            <p>Lesson Taken</p>
                            <h6>23 <span>83%</span></h6>
                        </div>
                        <div className="exam-passed-card">
                            <p>Exam Passed</p>
                            <h6>12 <span>90%</span></h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" performance-card-container">
                <div className="performance-graph">

                </div>
                <div className="performance-txt d-flex">
                    <h6>40% </h6><span>Your Productivity is 40% <br></br> higher compared to last month</span>
                </div>
            </div>
        </div>

        <div className="enrolled-Overall-conatainer d-flex align-items-center justify-content-between">
            <div className="enrolled-classes-accordian">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Accordion 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>

            <div className="overall-activity-container">
                <div className="performance-graph"></div>
                <div className="performance-txt d-flex">
                    <h6>40% </h6><span>Your Productivity is 40% <br></br> higher compared to last month</span>
                </div>
            </div>
        </div>
    </div>


    <div className="right-side-event">
        <input placeholder="search" />
        <span>Upcommig Events</span>
        <div className=""></div>
        <span>Assignments</span>
        <div className=""></div>
    </div>


</Box>
</Box> */}