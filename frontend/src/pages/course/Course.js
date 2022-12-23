import { useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from "../../components/Footer/Footer"
import "./Newcourse/CourseStore.css"
const Course = () => {
  const [courses, setCourses] = useState([
    {
      id: 11234, titel: "Maths", term: "Fall 2022", enrolledAs: "Student", published: "Yes"
    },
    {
      id: 54332, titel: "Structural Design", term: "Fall 2022", enrolledAs: "Student", published: "Yes"
    },
    {
      id: 34678, titel: "Modern Architecture", term: "Fall 2022", enrolledAs: "Student", published: "Yes"
    },
  ])

  return (
    <div className='Course mx-4 d-flex flex-column justify-content-between vh-100 pb-4'>
      <div className=''>
        <div className='w-100 d-flex align-items-center justify-content-between'><h2>All Course</h2> <Link to="/newcourse" className='btn btn-outline-secondary'>Add New Course</Link>
        </div>
        <div className='currentEnrollde'>
          <table className="table table-striped table-hover w-100 text-decoration-none">
            <thead>
              <tr>
                <th scope="col">Course Id</th>
                <th scope="col">Course Titel</th>
                <th scope="col">Term</th>
                <th scope="col">Enrolled as</th>
                <th scope="col">Published</th>
                <th scope="col">View</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, key) => {
                return (
                  <tr key={course.id}>
                    <th scope="row">{course.id}</th>
                    <td>{course.titel}</td>
                    <td>{course.enrolledAs}</td>
                    <td>{course.titel}</td>
                    <td>{course.published}</td>
                    <td>
                      <Link to={`/course/${course.id}`} className="w-100 text-dark text-decoration-none"> <button className='px-3 py-1 btn btn-outline-secondary'>View</button></Link></td>
                  </tr>)
              })}

            </tbody>
          </table>
        </div>
        <div className=''><h2>Past Enrollment</h2></div>
        <div className='pastEnrollde'>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Course Id</th>
                <th scope="col">Course Titel</th>
                <th scope="col">Term</th>
                <th scope="col">Enrolled as</th>
                <th scope="col">Published</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, key) => {
                return (
                  <tr key={course.id}>

                    <th scope="row">{course.id}</th>
                    <td>{course.titel}</td>
                    <td>{course.enrolledAs}</td>
                    <td>{course.titel}</td>
                    <td>{course.published}</td>
                    <td>
                      <Link to={`/course/${course.id}`} className="w-100 text-dark text-decoration-none"> <button className='px-3 py-1 btn btn-outline-secondary'>View</button></Link></td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
      <div className='mb-5'>
        <Footer />
      </div>
    </div>
  )
}

export default Course
