import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import Loading from "../../../components/LoadingError/Loading";
import Message from "../../../components/LoadingError/Error";
import Footer from '../../../components/Footer/Footer'
import "./CourseStore.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { getCourses as listCourses } from "../../../../redux/features/courses/CourseActions";
import { addToCart } from "../../../../redux/features/cart/cartSlices";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



const Newcourse = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const getCourses = useSelector((state) => state.getCourses);
  const { loading, error, courses } = getCourses;

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);


  const notify = () => toast("Adding to the cart!");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = (course) => {
    notify()
    dispatch(addToCart(course));
  };
  return (
    <div sx={{ width: "100%", padding: 0 }} className="CourseStoreBody  px-3 py-2">
      <div className="d-flex justify-content-between p-0 courseStoreContainer">
        <h4 className="">Availabel Courses</h4>
        <div className="d-flex py-1 CourseSearchBox">
          <input placeholder="Search.." className="ps-2  " />
          <Button variant="contained" className="SeachBtn">
            Search
          </Button>
        </div>
      </div>

      <Box sx={{ width: "100%", padding: 0, height: "100vh" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
          <Tabs
            className="text-dark mt-4"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              className=" bg-dark" label="All Course" {...a11yProps(0)} />
            <Tab
              className=" bg-dark" label="Popular" {...a11yProps(1)} />
            <Tab
              className=" bg-dark" label="New " {...a11yProps(2)} />
          </Tabs>
        </Box>
        {loading ? (
          <div className="mb-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row fetchCousebox g-0 p-0 m-0">
              {courses &&
                courses.map((item, i) => {
                  return (<>
                    {value === 0 ?
                      (
                        <>
                          <TabPanel className="g-0 col-12 col-lg-4 col-md-6  col-xl-3 m-0 p-0 ">
                            <Card className="CourseTitel m-0 p-0">
                              <CardHeader
                                avatar={
                                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.name.slice(0, 1)}
                                  </Avatar>
                                }
                                action={
                                  <IconButton aria-label="settings">
                                    <Link to={`/newcourse/${item._id}`}>
                                      <MoreVertIcon /></Link>
                                  </IconButton>
                                }
                                title={`${item.name.slice(0, 22)}..`}
                                subheader="September 14, 2016"
                              />


                              <div className="ImageBody w-100 h-100">
                                <CardMedia
                                  component="img"
                                  height="194"
                                  image={item.image}
                                  alt="Paella dish"
                                  className="image" style={{ width: "100%", height: "200px" }}
                                />
                                <div className="middle">
                                  <Link to={`/newcourse/${item._id}`}>
                                    <button className="CourseImageBtn text-white" >View</button></Link>
                                </div>
                              </div>



                              <CardContent>
                                <span variant="body2" color="text.secondary">
                                  This impressive paella is a perfect party dish and a fun
                                  meal to cook together with your guests. Add 1 cup of
                                  frozen peas along with the mussels, if you like.
                                </span>
                              </CardContent>
                              <CardActions className="d-flex justify-content-between m-2">
                                <div>
                                  <label style={{fontSize: "25px"}}> {item.cost}$ </label>

                                  <IconButton aria-label="add to favorites" className='bg-secondary mx-1'>
                                    <FavoriteIcon />
                                  </IconButton>
                                  <IconButton aria-label="share"
                                    className='bg-secondary'>
                                    <ShareIcon />
                                  </IconButton>

                                </div>

                                <div>
                                  <Button
                                    variant="contained" onClick={() => handleAddToCart(item)}
                                  >
                                    Add to cart
                                  </Button>
                                  <ToastContainer />
                                </div>
                              </CardActions>
                            </Card>
                          </TabPanel>

                        </>
                      )
                      :
                      (
                        <></>
                      )
                    }
                    {value !== 0 ?
                      <><TabPanel value={item.elevation} index={value} className="g-0 col-12 col-lg-4 col-md-6  col-xl-3 m-0 p-0 ">
                        <Card className="CourseTitel m-0 p-0">
                          <CardHeader
                            avatar={
                              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {item.name.slice(0, 1)}
                              </Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <Link to={`/newcourse/${item._id}`}>
                                  <MoreVertIcon /></Link>
                              </IconButton>
                            }
                            title={`${item.name.slice(0, 22)}..`}
                            subheader="September 14, 2016"
                          />

                          <div className="ImageBody w-100">
                            <CardMedia
                              component="img"
                              height="194"
                              image={item.image}
                              alt="Paella dish"
                              className="image" style={{ width: "100%", height: "200px" }}
                            />
                            <div className="middle">
                              <Link to={`/newcourse/${item._id}`}>
                                <button className="CourseImageBtn text-white" >View</button></Link>
                            </div>
                          </div>
                          <CardContent>
                            <span variant="body2" color="text.secondary">
                              This impressive paella is a perfect party dish and a fun
                              meal to cook together with your guests. Add 1 cup of
                              frozen peas along with the mussels, if you like.
                            </span>
                          </CardContent>
                          <CardActions className="d-flex justify-content-between m-2">
                            <div>
                              <label>{item.cost}$ </label>

                              <IconButton aria-label="add to favorites" className='bg-secondary mx-1'>
                                <FavoriteIcon />
                              </IconButton>
                              <IconButton aria-label="share"
                                className='bg-secondary'>
                                <ShareIcon />
                              </IconButton>

                            </div>

                            <div>
                              <Button
                                variant="contained"
                                onClick={() => (handleAddToCart(item))}
                              >
                                Add to cart
                              </Button>
                              <ToastContainer />
                            </div>
                          </CardActions>
                        </Card>
                      </TabPanel>
                      </>
                      :
                      <>
                      </>

                    }

                  </>)
                })}
            </div>
          </>
        )
        }
        <div className="sticky-top">
          {/* <Footer /> */}
        </div>

      </Box>
    </div>
  );
};

export default Newcourse;

