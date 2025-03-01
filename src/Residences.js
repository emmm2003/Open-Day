import React, { useState }  from 'react'; // Importing React and the useState hook for state management
import openDayData from './OpenDay.json'; // Importing JSON data
import Navbar from './Navbar'; // Importing a Navbar component
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import './App.css'; // Importing CSS file

function Residences() {
  // useState hook for managing filter and search state
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extracting programs data from JSON
  const programs = openDayData.topics[3].programs;

  // Creating an array of unique program types with "All" as the default option
  const programTypes = ["All", ...new Set(programs.map((program) => program.programType.type))];

  // Filtering programs based on selected filter and search query
  const filteredPrograms = programs.filter((program) => {
    const matchesFilter = filter === "All" || program.programType.type === filter;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.description_short.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="Residences">
      {/* Header Image */}
      <div class="header_img">
        <img className="title_img" src={openDayData.topics[3].cover_image} alt="Description" />
      </div>
      
      {/* Page Title */}
      <div class="header">
        <h1>Residences Events</h1>
      </div>
      
      {/* Navbar Component with search query state update function */}
      <Navbar setSearchQuery={setSearchQuery}/>

      <div class="body">
        {/* Subtitle */}
        <p class="subtitle">With a variety of different accommodation options, you can apply for a room that best suits your preferences, interests, and budgets. </p>

        {/* Filter Dropdown */}
        <div className="filter-container">
          <label htmlFor="filter">Filter by Event Type: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {programTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        {/* Displaying Filtered Programs */}
        <div class="card_container">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, index) => (
              <div class="card" key={index}>
                <header class="card_header">
                  <img 
                    className="img_2" 
                    /* Displaying different images based on the index */
                    /* As the JSON file doesnt contain images for the residences, images are hard coded */
                    src ={
                      index === 0 ? "taly_c.jpg" : 
                      index === 1 ? "taly_s.jpg" : 
                      index === 2 ? "senghennydd.jpg":
                      "no_image.jpg"
                    }
                    alt="Residence" 
                  />
                </header>

                {/* Program Title with Link Navigation */}
                <div>
                  <h2><Link to={`/topic/3/program/${index}`}>{program.title}</Link></h2>
                </div>

                {/* Program Description */}
                <div class="card_description">
                  <p>{program.description_short}</p>
                </div>

                {/* Footer Displaying Program Type */}
                <footer>
                  <p class="card_footer">{program.programType.type}</p>
                </footer>
              </div>
            ))
          ) : (
            <p>No results found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Residences;
