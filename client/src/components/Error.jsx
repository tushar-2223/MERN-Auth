import React from 'react'
import errorimg from '../images/errorimg.gif'

const error = () => {
  return (
      <div className='errorpage'>
          <img src={errorimg} alt="error" />
      </div>
  )
}

export default error