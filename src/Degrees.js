// Importing necessary modules from React and other components
import React, { useState } from 'react';  // useState is a React hook to manage component state
import openDayData from './OpenDay.json';  // Importing data (JSON) containing topics and related information
import Navbar from './Navbar';  // Importing Navbar component for search functionality
import { Link } from "react-router-dom";  // Importing Link for navigation between routes

// Degrees component where the degree information is displayed and filtered
function Degrees() {

  // State hook to manage the search query entered by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering degrees based on the search query
  const filteredDegrees = openDayData.topics.slice(4).filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Degrees">

      <div class="header_img">
        <img className="title_img" src={openDayData.topics[19].cover_image} alt="Description" />
      </div>
      
      <div class="header">
        <h1>Undergraduate Degree Events</h1>
      </div>
      
      {/* Navbar component to allow the user to search for specific degrees. Recieves a prop called setSearchQuery */}
      <Navbar setSearchQuery={setSearchQuery}/>

      <div class="body">

        <p class="subtitle">At Cardiff University, you can choose from over 300 degree programmes. We offer flexibility so you can tailor some components of your degree to suit your own interests and career ambitions.</p>

        <div className="card_container">
          {filteredDegrees.length > 0 ? (
            // Rendering degree cards dynamically based on the filtered degrees
            filteredDegrees.map((topic, index) => (
              <div className="card" key={index}>
                <header className="card_header">
                  <img className="img_2" src={topic.cover_image || "no_image.jpg"} alt="Residence" />
                </header>

                {/* Link to the specific degree events page. + 4 is because topics with id 0-3 are not subjects */}
                <div>
                  <h2><Link to={`/topic/${index + 4}`}>{topic.name}</Link></h2>
                </div>

                <div className="card_description">
                  <p>{topic.description}</p>
                </div>
              </div>
            ))
          ) : (
            // Message when no degrees match the search query
            <p>No results found matching your search.</p>
          )}
        </div>

      </div>
    
    </div>
  );
}

export default Degrees;
