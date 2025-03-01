/* imports and dependencies */

import React, { useState }  from 'react'; 
import './App.css';
import openDayData from './OpenDay.json'; /* parses the JSON file into a JavaScript object. */
import Navbar from './Navbar'; /* imports custom Navbar React component */
import { Link } from 'react-router-dom';


/* If a program lacks an image, getRandomImage() picks one from defaultImages */
const defaultImages = [
  "/temp1.png",
  "/temp2.png",
  "/temp3.png",
  "/temp4.png",
  "/temp5.png",
  "/temp6.png",
  "/temp7.png",
  "/temp8.png",
  "/temp9.png",
  "/temp10.png",
];

const getRandomImage = () => {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

/* Converts start & end timestamps into the format dd/mm/yyyy start_time - end_time */
const formatDateTime = (start, end) => {

  const startDate = new Date(start);
  const endDate = new Date(end);

  const formattedDate = startDate.toLocaleDateString("en-GB");

  const startTime = startDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = endDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${startTime} - ${endTime}`;
};

function Homepage() {

  /* uses useState hook to filter program events by type and allows for dynamic searching */
  /* re-renders the UI whenever these states change. */
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* only displays general program event */
  const programs = openDayData.topics[0].programs;


  /* Extracts unique program types for filtering and filters programs by event type and search query. */
  const programTypes = ["All", ...new Set(programs.map((program) => program.programType.type))];

  const filteredPrograms = programs.filter((program) => {
    const matchesFilter = filter === "All" || program.programType.type === filter;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.description_short.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="Homepage">
      

      <div class="header_img">
        <img className="title_img" src={openDayData.topics[0].cover_image} alt="Description" />
      </div>
      
      {/* openDayData.start_time & end_time → Formatted using formatDateTime() to show the event schedule. */}
      <div class="header">
        <h1>{openDayData.description} 
          <span style={{ fontSize: "0.4em", fontWeight: "normal" }}>
            {formatDateTime(openDayData.start_time, openDayData.end_time)}
          </span>
        </h1>
      </div>

      {/* renders the Navbar component and passes a function (setSearchQuery) as a prop. */}
      <Navbar setSearchQuery={setSearchQuery}/>

      <div class="body">
        
        <p class="subtitle">Choose how you want to experience our campuses and explore your new city. We offer in-person events, webinars, and virtual tours so you can get to know Cardiff University in a way that works for you.</p>

        {/* creates a dropdown (<select>) that filters events by type */}
        <div className="filter-container">
          <label htmlFor="filter">Filter by Event Type: </label>
          <select
            id="filter"
            value={filter}
            // Updates the filter state when the user selects an option and triggers a re-render to filter the event list.
            onChange={(e) => setFilter(e.target.value)}
          >
            {programTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Maps through the filteredPrograms array and displays the program events in cards. */}
        <div className="card_container">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, index) => (
              <div className="card" key={index}>
                <header className="card_header">
                  {/* If a program lacks an image, getRandomImage() picks one from defaultImages */}
                  <img className="img_2" src={program.cover_image || getRandomImage()} alt="Residence" />
                </header>

                <div>
                  <h2><Link to={`/topic/0/program/${index}`}>{program.title}</Link></h2>
                </div>

                <div className="card_description">
                  <p>{program.description_short}</p>
                </div>

                <footer>
                  <p className="card_footer">{program.programType.type}</p>
                </footer>
              </div>
            ))
          ) : (
            <p>No results found matching your search.</p>
          )}
        </div>
      </div>


      
    </div>);
}

{/* exports the Homepage component */}
export default Homepage;
