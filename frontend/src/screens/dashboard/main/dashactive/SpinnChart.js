import { useState, useEffect } from "react";
import "./dashactive.css";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ItemsCarousel from "react-items-carousel";
import DataGridPremiumDemo from "./statics/Courseoverall";
import va from "../../../app/assets/images/va.mp4";
import Footer from "../../components/Footer/Footer";
import dashCard3 from "../../../app/assets/images/dashCard3.png"
import dashCard2 from "../../../app/assets/images/dashCard1.png"
import dashCard4 from "../../../app/assets/images/dashCard4.png"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const CourseCarosel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [courseEnrolled, setCourseEnrolled] = useState([{}, {}, {}, {}, {}, {}, {},]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardNum, setCardNum] = useState(4);
  const chevronWidth = 40;
  console.log(courseEnrolled)
  const getFetchUsers = () => {
    fetch("http://localhost:3500/courseEnrolled")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setCourseEnrolled(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFetchUsers();
    ProgressChart();
  }, []);

  window.addEventListener("resize", function () {
    if (window.screen.width <= 992) {
      setCardNum(2);
    } else {
      setCardNum(4);
    }
  });
  // console.log(window.screen.width);

  return (
    <div >
      <div className="d-flex w-100 justify-content-between mb-3"></div>
      <div className="mb-2 w-100" id="CaroselBody">
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={cardNum}

          gutter={10}
          leftChevron={
            <Box className="ms-5">
              <Fab size="small" color="" aria-label="add">
                <ChevronLeftIcon />
              </Fab>
            </Box>
          }
          rightChevron={
            <Box className="me-5">
              <Fab size="small" color="" aria-label="add">
                <ChevronRightIcon />
              </Fab>
            </Box>
          }
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {courseEnrolled &&
            courseEnrolled.map((item, key) => {
              return (
                <CardContent
                  key={key}
                  xs={12}
                  md={6}
                  lg={3}
                  sx={{
                    height: 100,
                    padding: 0,
                    zIndex: -1
                  }}
                  className="pb-1 d-flex"
                >
                  <Item className="h-100 d-flex w-100">

                    <div class=" w-100 h-100 overflow-hidden">
                      <div class="row">
                        <div class="col-8 h-100" >
                          <div class="numbers">
                            <p class="text-sm mb-0 text-capitalize font-weight-bold">
                              Bootstrap Course
                              {item.title}
                            </p>
                            <h6 class="font-weight-bolder mb-0">
                              53 Projects
                              <span class="text-success text-sm font-weight-bolder">+55%</span>
                            </h6>
                          </div>
                        </div>
                        <div class="col-4 h-100 text-end">
                          <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                            <img src="https://www.bootstrap4k.com/wp-content/uploads/2020/08/cropped-Bootstrap4KLogoV2-1.png" class="text-lg opacity-10 w-100" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>


                  </Item>
                </CardContent>
              );
            })}
        </ItemsCarousel>
      </div>

      <Grid
        container
        spacing={2}
        className="row  g-0"
        sx={{
          height: 100,
          color: "success.main",
          "& .MuiSlider-thumb": {
            borderRadius: "1px",
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          sx={{
            height: 260,
          }}
          className="col order-md-first "
        >
          <Item className="h-100 w-100 overflow-hidden">
            <video
              src={va}
              className="advideo"
              // controls
              loop
              autoPlay
              muted
              type="video/mp4"
            />
            <div className="d-flex w-100 justify-content-between">
              <h6 className="pt-3">Add Video's</h6>
              <button className="btn btn-light mt-1 btn-outline-primary text-dark">
                Learn more..
              </button>
            </div>
          </Item>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{
            height: 260,
          }}
          className="col order-sm-3 order-lg-first d-none d-xl-block"
        >
          <Item className="overflow-hidden h-100 p-0">
            <MixedBargraph />
          </Item>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          sx={{
            height: 260,
          }}
        >
          <Item className="h-100 w-100 col order-lg-0 overflow-hidden">
            <ProgressChart />
          </Item>
        </Grid>


        <Grid
          item
          xs={12}
          sm={7}
          lg={7}
          sx={{
            height: 400,
          }}
          className="col "
        >
          <Item className="h-100 pt-0">
            <CourseProgressTabel />
          </Item>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          lg={5}
          sx={{
            height: 400,
            padding: 0
          }}
        >
          <Item className="w-100 h-100 col " id="spiningChartbox">
            <SpinnChart />
          </Item>
        </Grid>



        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            height: "81vh",
          }}
        >
          <Item className="h-100 col" id="">
            <Notify />
          </Item>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            height: "81vh",
          }}
        >
          <Item className="h-100 col p-0 bg-transparent" id="">
            <Grid
              item
              xs={12}
              sx={{
                height: "37vh",
                marginBottom: "2vh",
              }}
            >
              <Item className="h-100 col  " id="" >
                <img src={dashCard3} className="w-100 h-100"/>
              </Item>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                height: "40vh",
              }}
            >
              <Item className="h-100 col bg-light" id=""><img src={dashCard4} className="w-100 h-100"/>
              </Item>
            </Grid>
          </Item>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            height: "80vh",
          }}
        >
          <Item className="h-100 col p-0 bg-transparent" id="">

            <Grid
              item
              xs={12}
              sx={{
                height: "19vh",
                marginBottom: "1vh",
              }}
            >
              <Item className="h-100 col  " id="">
                
              <img src={dashCard2} alt="" className="w-100 h-100"/>
              </Item>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                height: "19vh",
                marginBottom: "1vh",
              }}
            >
              <Item className="h-100 col " id="">
                <Promotion />
              </Item>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                height: "19vh",
                marginBottom: "1vh",
              }}
            >
              <Item className="h-100 col " id="">
                <Promotion />
              </Item>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                height: "19vh",
                marginBottom: "1vh",
              }}
            >
              <Item className="h-100 col " id="">
                <Promotion />
              </Item>
            </Grid>
          </Item>
        </Grid>





        <Grid
          item
          xs={12}
          md={6}
          lg={12}
          sx={{
            height: "81vh",
          }}
        >
          <Item className="h-100 col lastCardDemo" id=""><DataGridPremiumDemo /></Item>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            height: "auto",
            marginBottom: "10px"
          }}
        >
          <Item className="h-100 mb-5 col " id=""><Footer /></Item>
        </Grid>


      </Grid>
    </div>
  );
};

export const SpinnChart = () => {
  const [spine, setSpine] = useState({
    series: [
      {
        name: "Weekly",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Over all project",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-09-19T00:00:00.000Z",
          "2022-09-19T01:30:00.000Z",
          "2022-09-19T02:30:00.000Z",
          "2022-09-19T03:30:00.000Z",
          "2022-09-19T04:30:00.000Z",
          "2022-09-19T05:30:00.000Z",
          "2022-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div className="chartLeft  p-1 rounded text-white my-2" id="">
      <h5 className="ps-2 overflow-hidden text-dark">Live Learning Activity</h5>
      <div id=" overflow-hidden">
        <Chart
          options={spine.options}
          series={spine.series}
          type="area"
          id="spinningChart"
          className=" text-white"
        />
      </div>
    </div>
  );
};

// export const DonutChart = () => {
//   const [donut, setDonut] = useState({
//     series: [44, 55, 41, 17, 15],
//     options: {
//       chart: {
//         width: 200,
//         type: "donut",
//       },
//       plotOptions: {
//         pie: {
//           startAngle: -90,
//           endAngle: 270,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       fill: {
//         type: "gradient",
//       },
//       legend: {
//         formatter: function (val, opts) {
//           return val + " - " + opts.w.globals.series[opts.seriesIndex];
//         },
//       },
//       title: {
//         text: "Gradient Donut with custom Start-angle",
//       },
//       responsive: [
//         {
//           breakpoint: 400,
//           options: {
//             chart: {
//               width: 100,
//             },
//             legend: {
//               position: "bottom",
//             },
//           },
//         },
//       ],
//     },
//   });
//   return (
//     <div className="d-block m-2">
//       <div className="chartRight bg-white mb-3 rounded  p-2">
//         <div id="donutChart">
//           <Chart
//             options={donut.options}
//             series={donut.series}
//             type="donut"
//             width={250}
//             height={350}
//             className="bg-dark"
//           />
//         </div>
//       </div>
//       <div className="chartRight bg-white rounded  p-2 h-100 w-100"></div>
//     </div>
//   );
// };

export const CourseProgressTabel = () => {
  return (
    <div class="card-body px-0 pb-2 overflow-hidden">
      <div className="w-100 text-start ps-2 bg-light py-2 ">
        <h4>Projects</h4>
      </div>
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Courses
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Groups
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Projects
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Completion
              </th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png"
                      class="avatar avatar-sm me-3"
                      style={{ height: "60px" }}
                      alt="xd"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> Bootstrap 5 Version</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="avatar-group mt-2">
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/2b_en_articleslide_sm2-350x264.jpg" alt="team2"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6LRq4HzJhobJRlf0XNBX0gHPqHP3Uv3AruGeRf85dIlNej9o7n2GfmoHmFDiJI8kRjjM&usqp=CAU" alt="team2"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="team3"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">122</span>
              </td>
              <td class="align-middle">
                <div class="progress-wrapper w-75 mx-auto">
                  <div class="progress-info">
                    <div class="progress-percentage">
                      <span class="text-xs font-weight-bold">25%</span>
                    </div>
                  </div>
                  <div class="progress">
                    <div
                      class="progress-bar bg-gradient-info w-25"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="25"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png"
                      class="avatar avatar-sm me-3"
                      style={{ height: "60px" }}
                      alt="xd"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> Bootstrap 5 Version</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="avatar-group mt-2">
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/2b_en_articleslide_sm2-350x264.jpg" alt="team2"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6LRq4HzJhobJRlf0XNBX0gHPqHP3Uv3AruGeRf85dIlNej9o7n2GfmoHmFDiJI8kRjjM&usqp=CAU" alt="team2"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="team3"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">122</span>
              </td>
              <td class="align-middle">
                <div class="progress-wrapper w-75 mx-auto">
                  <div class="progress-info">
                    <div class="progress-percentage">
                      <span class="text-xs font-weight-bold">25%</span>
                    </div>
                  </div>
                  <div class="progress">
                    <div
                      class="progress-bar bg-gradient-info w-25"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="25"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png"
                      class="avatar avatar-sm me-3"
                      style={{ height: "60px" }}
                      alt="xd"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> Bootstrap 5 Version</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="avatar-group mt-2">
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/2b_en_articleslide_sm2-350x264.jpg" alt="team2"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6LRq4HzJhobJRlf0XNBX0gHPqHP3Uv3AruGeRf85dIlNej9o7n2GfmoHmFDiJI8kRjjM&usqp=CAU" alt="team2"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                  <a
                    href=""
                    class="avatar avatar-xs rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Romina Hadid"
                  >
                    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="team3"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  </a>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">122</span>
              </td>
              <td class="align-middle">
                <div class="progress-wrapper w-75 mx-auto">
                  <div class="progress-info">
                    <div class="progress-percentage">
                      <span class="text-xs font-weight-bold">25%</span>
                    </div>
                  </div>
                  <div class="progress">
                    <div
                      class="progress-bar bg-gradient-info w-25"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="25"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MixedBargraph = () => {
  const [spine, setSpine] = useState({
    series: [
      {
        name: "TEAM A",
        type: "column",
        data: [23, 11, 22, 27, 13, 22, 17, 21, 22, 30, 19],
      },
      {
        name: "TEAM B",
        type: "column",
        data: [30, 25, 16, 30, 15, 23, 19, 29, 27, 22, 16],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "01/01/2022",
        "02/01/2022",
        "03/01/2022",
        "04/01/2022",
        "05/01/2022",
        "06/01/2022",
        "07/01/2022",
        "08/01/2022",
        "09/01/2022",
        "10/01/2022",
        "11/01/2022",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Points",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    },
  });

  return (
    <div className="d-block w-100 h-100 mixedChart">
      <div id="chart" className="p-2">
        <ReactApexCharts
          options={spine.options}
          series={spine.series}
          type="line"
          height={350}
        />
      </div>
      <div className="">
        <h5 className="">
          tit
        </h5>
      </div>
    </div>
  );
};

const Promotion = () => {
  return (
    <div class=" w-100 h-100 overflow-hidden">
      <div class="row">
        <div class="col-8 h-100" >
          <div class="numbers">
            <p class="text-sm mb-0 text-capitalize font-weight-bold">
              Bootstrap Course
            </p>
            <h6 class="font-weight-bolder mb-0">
              53 Projects
              <span class="text-success text-sm font-weight-bolder">+55%</span>

            </h6>

            <div className="progress-bar progress-bar-striped w-50" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>

          </div>
        </div>
        <div class="col-4 h-100 text-end">
          <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
            <img src="https://www.bootstrap4k.com/wp-content/uploads/2020/08/cropped-Bootstrap4KLogoV2-1.png" class="text-lg opacity-10 w-100 h-100" alt="" />
          </div>
        </div>
      </div>
      <div class="progress">

      </div>
    </div>
  )
}

const Notify = () => {
  return (<>
  <h3 className="w-100 bg-light p-2"> Assignment due today</h3>
    <ol class="list-group list-group-numbered">
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Maths</div>
          Content for list item
        </div>
        <span class="badge bg-primary rounded-pill">14</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Web Dev 200</div>
          Content for list item
        </div>
        <span class="badge bg-primary rounded-pill">8</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Javascript 201</div>
          Content for list item
        </div>
        <span class="badge bg-primary rounded-pill">3</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">C++ 1008</div>
          Content for list item
        </div>
        <span class="badge bg-primary rounded-pill">5</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">Subheading</div>
          Content for list item
        </div>
        <span class="badge bg-primary rounded-pill">10</span>
      </li>
    </ol>
  </>)
}

const ProgressChart = () => {
  var options = {
    chart: {
      height: 250,
      type: "radialBar",
    },

    series: [83],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 1,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Your GPA"],
  };

  var chart = new ApexCharts(document.querySelector("#prochart"), options);
  chart.render();

  return (
    <div className="gradeProgress">
      <div className=" overflow-hidden ps-1">
        <h5 className="">
          Total Score</h5>
      </div>
      <div id="prochart" > </div>
    </div>
  );
};
