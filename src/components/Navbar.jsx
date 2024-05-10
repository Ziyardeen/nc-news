import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { fetchTopics, fetchUserNames } from '../../api/requests'



const Navbar = ({selectedUsername, setSelectedUsername}) => {
    const [users, setUsers] = useState([]) 
    const [topics, setTopics] = useState([]) 
    const [selectedSort, setSelectedSort] = useState('created_at')
    const [selectedOrder, setSelectedOrder] = useState('asc')
    const navigate = useNavigate();

    useEffect(() => { 
        fetchUserNames().then(users => setUsers(users))
    },[])

    const handleChange = ({target})=>{
        setSelectedUsername(target.value)
    }

    const user = users.filter((user) => {
      return user.username === selectedUsername;
    })

    useEffect(() => {
      fetchTopics().then((data) => {
        
        const topics = data.map((obj) => {
          return obj.slug
        })
        setTopics(topics)
        return topics
      })
    },[])

    // Sorting
    const handleSort = (event)=>{
        setSelectedSort(event.target.value)
    }
    const handleOrder = (event)=>{
        setSelectedOrder(event.target.value)
    }
    console.log(selectedOrder,selectedSort)

    const handleClick = (e)=>{
        e.preventDefault()
        navigate(`/articles?sort_by=${selectedSort}&order=${selectedOrder}`)
    }

    console.log(selectedOrder,selectedSort)
    
   


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

    <div className='topics'>
        {topics.map((topic) => {
            return <NavLink key ={topic} to={`/articles?topic=${topic}`}> {topic} </NavLink>
        })}
    </div>

    <form className="search-bar">
        <div>
            <label htmlFor="sort-order" >Sort Order:</label>
            <select id="sort-order" onChange={handleOrder}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>

        <div>
        <label htmlFor="sort-by">Sort By:</label>
            <select id="sort-by" onChange={handleSort}>
                {/* <option value="votes">Vote</option> */}
                <option value="created_at">Date</option>
                {/* <option value="comment_count">Comment</option> */}
            </select>
        </div>
        <div>
            <button className='Sort' onClick={handleClick}>Sort</button>
        </div>

        {/* <input type="text" name="search" placeholder="Sort..."/>
        <input type="text" name="search" placeholder="Order..."/>
        <button type="submit">Search</button> */}
    </form>
   </div>
</div>
   
  )
}

export default Navbar