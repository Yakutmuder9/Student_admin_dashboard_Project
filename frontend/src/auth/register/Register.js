import React from 'react'
import './register.css';

const Register = () => {
  return (
    <div className='register'>

      <div className="login" >
        {/* animated-background */}
        <div className="login-back-animated" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >

        {/* login-card */}
        <div className='login_card  px-5' style={{ width: "420px" }}>

          <div className='login_profile'>
            <img className='logo' src='logo.ico' />
          </div>

          <div className='login_desc mb-3'>
            <h3>
              Welcome To
              <span> WKU <br></br>Student </span>
              Dashboard
            </h3>
          </div>

          <form >
            <div className='d-flex justify-content-between'>
              <div className="form__group  mb-1" style={{ width: "48%" }}>
                <input type="text" className="form__input" id="firstName" placeholder="First Name" required="" />
                <label htmlFor="firstName" className="form__label">First Name</label>
              </div>
              <div className="form__group  mb-1" style={{ width: "48%" }}>
                <input type="text" className="form__input" id="lastName" placeholder="Last Name" required="" />
                <label htmlFor="lastName" className="form__label">Last Name</label>
              </div>
            </div>



            <div className="form__group  my-1">
              <input type="text" className="form__input" id="firstName" placeholder="Email" required="" />
              <label htmlFor="email" className="form__label">Email</label>
            </div>


            <div className='d-flex justify-content-between  my-1'>
              <div className="form__group  my-1" style={{ width: "48%" }}>
                <input type="date" className="form__input" name="trip-start" value="" min="1950-01-01" max="2005-01-01" id="db" />
                <label htmlFor="db" className="form__label text-light pt-0 mt-0 " id='db_label'>Date of Birth</label>
              </div>

              <div className="form__group my-1" style={{ width: "48%" }}>
                <select lass="form__input w-100" id="gender">
                  <option value="">Gender</option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
            </div>


            <div className="form__group  my-1">
              <input type="password" className="form__input" id="password" placeholder="Password" required="" autoComplete="off" />
              <label htmlFor="password" className="form__label">Password</label>
            </div>

            <div className="form__group mt-1 mb-0" style={{ height: "60px" }}>
              <input type="password" className="form__input " id="password" placeholder="Confirm Password" required="" autoComplete="off" />
              <label htmlFor="password" className="form__label position-absolute">Confirm Password</label>

              <div className='d-flex justify-content-between  my-1'>

                <a href='login' className='my-0 ' >Already User?</a>
                <a href='help'>Need Help?</a>
              </div>
            </div>

            <div className='submit_btn_container'>
              <button type='submit' > Register</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register