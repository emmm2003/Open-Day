import React from 'react'; // Importing the React library, which is needed to define the component
import './Navbar.css'; // Importing the CSS file for styling the Navbar component


// Navbar component receives the setSearchQuery function as a prop to update the search query state
const Navbar = ({ setSearchQuery }) => {
  // Unordered list (ul) to create a navigation bar with different menu items
  return (
    <ul>
      <li><a href="/home">General Events</a></li>
      <li><a href="/degrees">Undergraduate Degree Subject Events</a></li>
      <li><a href="/residences">Residences Events</a></li>
      <li><a href="/life">Student Life Events</a></li>
      <li className='search'>
        {/* Input field to capture the search query */}
        <input 
          type="text" 
          placeholder="Search.." 
          onChange={(e) => setSearchQuery(e.target.value)} // Updates the search query in the parent component when the user types
        />
      </li>
    </ul>
  )
};

// Exporting the Navbar component to be used in other parts of the application
export default Navbar;
