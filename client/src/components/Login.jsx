import React, { useContext, useState } from 'react'
import loginpic from '../images/login.svg'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../App'

const Login = () => {

  // state change

  const {state,dispatch} = useContext(UserContext);


  //////
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,password
      })
    })

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credential");
    } else {

      dispatch({ type: "USER",payload:true })//usecontext
      
      window.alert("Login successfull");
      navigate("/");
    }

  }

  return (
    <>
      <section className='authcontainer'>
        <div className="authbox loginbox">
          <form className='auth-form' id='auth-form'
          method='POST'>

            <h4 className='header'>Log in</h4>

            <div className="inp">
              <label htmlFor="email"><i className="zmdi zmdi-email zmdi-hc-lg"></i></label>
              <input type="email" name="email" id="email" autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email' />
            </div>

            <div className="inp">
              <label htmlFor="password"><i className="zmdi zmdi-lock zmdi-hc-lg"></i></label>
              <input type="password" name="password" id="password" autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Your Password' />
            </div>

            <div className="form-group form-button">
              <input type="submit" name='signin' id='signin' className='form-submit' value="Login"
                onClick={loginUser}
              />
            </div>

            <Link to="/signup">Signup</Link>
          </form>

          <img src={loginpic} alt="loginpic" id='authpic' />
        </div>
      </section>
    </>
  )
}

export default Login