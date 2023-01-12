import React, { createContext, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Aboutuser from './components/Aboutuser'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Error from './components/Error'
import Logout from './components/Logout'
import Editdetail from './components/Editdetail'

import { initialState,reducer } from './reducer/UseReducer'
// toggle navbar
//contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path='/'
        element={<Home />}
      />
      <Route path="aboutuser"
        element={<Aboutuser />}
      />
      <Route path="contact"
        element={<Contact />}
      />
      <Route path="login"
        element={<Login />}
      />
      <Route path="signup"
        element={<Signup />}
      />
      <Route path="logout"
        element={<Logout />}
      />
      <Route path="editdetail"
        element={<Editdetail />}
      />
      <Route path="*"
        element={<Error />}
      />
    </Routes>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <NavBar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
