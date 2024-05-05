import React from 'react'
import { NavLink, Link } from 'react-router-dom'



const Navbar = () => {
  return (
<div className='navbar'>
    <div className="user-info">
        <img src="https://images.freeimages.com/fic/images/icons/2787/beautiful_flat_icons/128/rocket.png?fmt=webp&h=350" alt="User Image"/>
        < span className="user-name">Ziyardeen Alhassan</span>
    </div>

    <div className='nav-links'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/articles">Articles</NavLink>
    </div>

    <form className="search-bar">
        <input type="text" name="search" placeholder="Search..."/>
        <button type="submit">Search</button>
    </form>
</div>
   
  )
}

export default Navbar