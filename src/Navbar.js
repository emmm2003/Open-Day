import React from 'react';
import './Navbar.css';

const Navbar = ({ setSearchQuery }) => {
  return (
    <ul>
      <li><a href="/home">General Events</a></li>
      <li><a href="/degrees">Undergraduate Degree Subject Events</a></li>
      <li><a href="/residences">Residences Events</a></li>
      <li><a href="/life">Student Life Events</a></li>
      <li className='search'>
        <input 
          type="text" 
          placeholder="Search.." 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </li>
    </ul>
  )
};

export default Navbar;
