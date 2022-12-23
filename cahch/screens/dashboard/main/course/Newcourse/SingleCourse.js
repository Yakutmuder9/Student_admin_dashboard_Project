import { useEffect, useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import Message from "../../../components/LoadingError/Error";
import axios from "axios";
import Loading from "../../../components/LoadingError/Loading";
import Footer from "../../../components/Footer/Footer"
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from "../../../../redux/features/cart/cartSlices";

const SingleCourse = () => {
  const dispatch = useDispatch();
  const [course, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const paramsId = useLocation();
  const courseId = paramsId.pathname.slice(11, 36);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await axios.get(`/courses/${courseId}`);
        console.log(data)
        setCourses(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  const notify = () => toast("Adding to the cart!");  
  
  const handleAddToCart = (course) => {
    notify()
    dispatch(addToCart(course));
    // window.location.reload();
  };
  
  return (
    <>
      <div className="container single-course h-100 px-3">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-4">
                <div className="single-image">
                  <img src={course.image} alt={course.name} style={{ width: "80%" }} />
                </div>
              </div>
              <div className="col-md-8 bg-light shadow rounded mt-2">
                <div className="course-dtl">
                  <div className="course-info p-2">
                    <div className="course-name"><h2>{course.name}</h2></div>
                  </div>
                  <p>{course.description}</p>
                  <div className="course-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>${course.cost}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {course.countInStock > 0 ? (
                        <span>unavailable</span>
                      ) : (
                        <span>Availabel</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={course.rating}
                        text={` star`}
                      />
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Student's</h6> 12
                      {/* <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(course.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select> */}
                    </div>
                    <button
                      onClick={()=>handleAddToCart(course)}
                      className="btn btn-outline-primary round-black-btn mb-3"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="m-3">STUDENT REVIEWS</h2>

            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {course.comments && course.comments.length === 0 && (
                  <Message variant={"alert-info mt-3"}>No Reviews</Message>
                )}
                {course.comments && course.comments.map((review) => {
                  return(<>
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                     <strong>{review.author}</strong>
                    <Rating value={review.rating} /> 
                    <div className="alert alert-info mt-3">
                      {review.text}
                    </div>
                  </div>
                  </>
                )
                })}

               
              </div>
              <div className="col-md-6">
                <h6>WRITE A CUSTOMER REVIEW</h6>
                  <form 
                  >
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        row="3"
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
              </div>
            </div>
            <Footer />
          </>
        )}

      </div>
    </>
  )
}

export default SingleCourse;
