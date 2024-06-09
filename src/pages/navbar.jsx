import React from 'react'
import {Link} from "react-router-dom"
import "../css/navbar.css"
const navbar = () => {
  return (
    <div className='navbar'>
        {/* navbar  */}
        <ul className='navbar-list'>
            <Link to ="/"><li>Dashboard</li></Link>
            <Link to ="/chatapp"><li>ChatApp</li></Link>
            <li>About</li>
            <li>Contact</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Blog</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}

export default navbar