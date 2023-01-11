import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import signpic from '../images/signup.svg'

const Signup = () => {
  const navigate = useNavigate();// redirect page

  const [user, setUser] = useState({
    name: "", email: "",work: "", phone: "", password: "", cpassword: ""
  });

  let name, value;

  const handleInputs = (e) => {
    // store name and value of input field
    name = e.target.name;
    value = e.target.value;
                    // dynamic name
    setUser({ ...user, [name]: value });
  }

  // send data to backend
  //using fetch api
  const PostData = async(e) => {
    e.preventDefault();//dont reload page

    const { name, email,work, phone, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email,work, phone, password,cpassword
      })
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Registration Successfull");
      navigate("/login");
    }
  }

  return (
    <>
      <section className='authcontainer'>
        <div className="authbox signupbox">
          <form method="POST" className='auth-form' id='auth-form'>

            <h4 className='header'>Sign Up</h4>

            <div className="inp">
              <label htmlFor="name"><i className="zmdi zmdi-account zmdi-hc-lg"></i></label>
              <input type="text" name="name" id="name" autoComplete='off'
                value={user.name}
                onChange={handleInputs} placeholder='your name' />
            </div>

            <div className="inp">
              <label htmlFor="email"><i className="zmdi zmdi-email zmdi-hc-lg"></i></label>
              <input type="email" name="email" id="email" autoComplete='off'
                value={user.email}
                onChange={handleInputs} placeholder='your Email' />
            </div>

            <div className="inp">
              <label htmlFor="phone"><i className="zmdi zmdi-phone zmdi-hc-lg"></i></label>
              <input type="number" name="phone" id="phone" autoComplete='off'
                value={user.phone}
                onChange={handleInputs} placeholder='your Phone' />
            </div>

            <div className="inp">
              <label htmlFor="work"><i className="zmdi zmdi-slideshow zmdi-hc-lg"></i></label>
              <input type="text" name="work" id="work" autoComplete='off'
                value={user.work}
                onChange={handleInputs} placeholder='your Profession' />
            </div>

            <div className="inp">
              <label htmlFor="password"><i className="zmdi zmdi-lock zmdi-hc-lg"></i></label>
              <input type="password" name="password" id="password" autoComplete='off'
                value={user.password}
                onChange={handleInputs} placeholder='your Password' />
            </div>

            <div className="inp">
              <label htmlFor="cpassword"><i className="zmdi zmdi-lock zmdi-hc-lg"></i></label>
              <input type="password" name="cpassword" id="cpassword" autoComplete='off'
                value={user.cpassword}
                onChange={handleInputs} placeholder='Confirm Your Password' />
            </div>

            <div className="form-group form-button">
              <input type="submit" name='signup' id='signup' className='form-submit' value="register" onClick={PostData}/>
            </div>

            <Link to="/login" className='pageauthbtn'>Log in</Link>
          </form>

          <img src={signpic} alt="signpic" id='authpic' />
        </div>
      </section>
    </>
  )
}

export default Signup