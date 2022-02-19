import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    let {pathname: navigate} = useLocation();

  return (
    <div className='task-2-intro'> 
            <Link 
                to={navigate === '/' ? '/chart-page' : '/'}>
                    CLICK TO VIEW TASK {navigate === '/' ? 2 : 1} -    

            </Link>  
            {navigate === '/' ? ' Check Out Award Wining Actor!' : ' Check Out Our Posts'}
            
    </div>
  )
}

export default Navbar