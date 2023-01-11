import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

import { UserContext } from '../App';

const NavBar = () => {

  const {state,dispatch} = useContext(UserContext);

  
  const RenderMenu = () => {
    //if contaxt api USER state true than show logout page
    if (state) {
      return (
        <>
           <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/aboutuser">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
        </>
        )
    } else {
      return (
        <>
           <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/aboutuser">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Registration</Link>
              </li>
        </>
      )
      }
  }
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <Link className="navbar-brand fw-bold" to='/'>MERN AUTH</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">

              <RenderMenu />
              {/* any function name */}
            
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar