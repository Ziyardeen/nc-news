import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { fetchUserNames } from '../../api/requests'



const Navbar = ({selectedUsername, setSelectedUsername}) => {
    const [users, setUsers] = useState([]) 

    useEffect(() => { 
        fetchUserNames().then(users => setUsers(users))
    },[])

    const handleChange = ({target})=>{
        setSelectedUsername(target.value)
    }

    const user = users.filter((user) => {
      return user.username === selectedUsername;
    })


  return (
<div className='navbar'>

    <div className="header-container">
         <h1 className='header'>NC News App</h1>
    </div>
    
<div className='nav-container'>

    <div className="user-info">
        <img src={user.length === 0 ? "https://images.freeimages.com/fic/images/icons/2787/beautiful_flat_icons/128/rocket.png?fmt=webp&h=350" : user[0].avatar_url} alt="User Image"/>
        <select value={selectedUsername} onChange={handleChange}>
        <option></option>
            {users.map(user => {
            return <option key={user.username} value={user.username}>{user.username}</option>
        })}
        </select>
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
</div>
   
  )
}

export default Navbar