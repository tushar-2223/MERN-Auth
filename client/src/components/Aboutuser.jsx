import React,{useEffect,useState} from 'react'
import mypic from "../images/myphoto.jpg"
import {useNavigate} from 'react-router-dom'


const About = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    callAboutPage();
  }, []);

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
       }

    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }


  return (
    <section className='aboutsection'>
      <form method='GET' className='aboutform'>

        <div className="detailsection">
          <img src={mypic} alt="" />
          <div className="aboutme">
            <h4>{ userData.name }</h4>
            <h6>{ userData.work }</h6>
            <p className='profile-rating mt-3 mb-5'>RANKING <span> 1/10 </span></p>

            <div className="profile__edit__btn mt-3">
              <input type="submit" className='profilebtn' name='btnAddmore' value="Edit Profile" />
            </div>
          </div>
        </div>

        <div className="info__section">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
              <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active text-center" id="home" role="tabpanel" aria-labelledby="nav-home-tab">

              <div className="row__flex">
                <label>User ID</label>
                <p>{ userData._id}</p>
              </div>

              <div className="row__flex">
                <label>Name</label>
                <p>{userData.name}</p>
              </div>

              <div className="row__flex">
                <label>Email</label>
                <p>{userData.email}</p>
              </div>

              <div className="row__flex">
                <label>Phone</label>
                <p>{ userData.phone}</p>
              </div>

              <div className="row__flex">
                <label>Profession</label>
                <p>{userData.work}</p>
              </div>


            </div>

            <div class="tab-pane fade text-center" id="profile" role="tabpanel" aria-labelledby="nav-profile-tab">

              <div className="row__flex">
                <label>Experience</label>
                <p>Expert</p>
              </div>

              <div className="row__flex">
                <label>Total Project</label>
                <p>100</p>
              </div>

            </div>

          </div>

        </div>

      </form>
    </section>
  )
}

export default About