import React,{useEffect,useState} from 'react'
// import {useNavigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});

  const userContact = async () => {
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
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone})

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
       }

    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    userContact();
  }, []);

  // we are storing data in states
  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData,[name]:value})
  }

  // send the data to backend

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,email,phone,message
      })
    });

    const data = await res.json();

    if (!data) {
      console.log("messge not sent");
    } else {
      alert("Message send successfully");
      setUserData({ ...userData,message:""});
    }
  }

  return (
    <div className='contacrcontainer'>
      <form method="POST">
        <header>Get in Touch</header>
        <div className="contactbox">
          <div className="inpbox">
            <input type="text" name="name" placeholder="Your Name"
              value={userData.name}
              onChange={handleInputs}
            />
          </div>
          <div className="inpbox">
            <input type="text" name="email" placeholder="Your Email"
              value={userData.email}
              onChange={handleInputs}/>
          </div>
          <div className="inpbox">
            <input type="text" name="phone" placeholder="Your Phoneno"
              value={userData.phone}
              onChange={handleInputs}/>
          </div>
          <div className="inpbox">
            <textarea name="message" placeholder="Your Message" rows="5" cols="22"
             onChange={handleInputs}/>
          </div>

          <div className="submitbtn">
            <button type="submit" onClick={contactForm}>Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Contact