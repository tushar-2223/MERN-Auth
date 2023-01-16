import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Editdetail = () => {
  const navigate = useNavigate();

  // get data
  const [user, setUser] = useState({
    name: "", email: "", work: "", phone: ""
  })

  useEffect(() => {
    Getdata();
  },[]);

  const Getdata = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      // console.log(data);
      // setUserData(data);
      setUser({...user,name:data.name,email:data.email,phone:data.phone,work:data.work})

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
       }

    } catch (error) {
      console.log(error);
    }
  }

  let name, value;

  const handleInputs = (e) => {
     // store name and value of input field
     name = e.target.name;
     value = e.target.value;
                     // dynamic name
    setUser({ ...user, [name]: value });
  }
  
  const EditData = async(e) => {
    e.preventDefault();

    const { name, email, work, phone } = user;
    
    const res = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email,work, phone
      })
    });

    const data = await res.json();

    if (data.status === 422) {
      window.alert("updated unsuccessfully");
    }
    else {
      window.alert("Updated successfully")
      navigate("/Aboutuser");
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

            <div className="form-group form-button">
              <input type="submit" name='edit' id='edit' className='form-submit' value="Update" onClick={EditData}/>
            </div>

          </form>

        </div>
      </section>
    </>
  )
}

export default Editdetail