import React,{useEffect,useState} from 'react'
import Welcomeimg from '../images/welcome.svg'

const Home = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      // console.log(data);
      setUserName(data.name);
      setShow(true);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userHomePage();
  },[])

  return (
    <>
    <div className='homecontainer'>
        <img src={Welcomeimg} alt="Welcomeimg" />
        <br />
        <h1>{userName}</h1>
    </div>
    </>
  )
}

export default Home