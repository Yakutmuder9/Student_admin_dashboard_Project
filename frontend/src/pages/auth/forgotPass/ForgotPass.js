

const ForgotPass = () => {
  return (
    <div>
      <div className="login">
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
        <div className='login_card'>

          <div className='login_profile'>
            <img className='logo' src='logo.ico' />
          </div>

          <div className='login_desc mb-5'>
            <h3>
              Welcome back
              <span> WKU <br></br>Student </span>
              Dashboard
            </h3>
          </div>



          <div className="form__group ">
            <a href="#" className="forgotpassword-screen__subtext text-light">
              Please enter the email address you register your account with. We will send you reset password confirmation to this email
            </a>
          </div>
          <form >


            <div className="form__group">
              <input type="email" className="form__input" id="email" placeholder="Email" required="" autocomplete="off" />
              <label htmlFor="email" className="form__label position-absolute" autocomplete="false">Email</label>

              <div className='d-flex justify-content-between  my-1'>
                <a href='register'>New User?</a>
                <a href='forgotpassword'>Need Help?</a>

              </div>

            </div>

            <div className='submit_btn_container'>
              <button type='submit' > Send Email</button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default ForgotPass