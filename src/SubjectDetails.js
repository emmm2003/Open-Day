import { useParams } from "react-router-dom"; // Import useParams to extract route parameters
import React, { useState }  from 'react'; // Import React and useState hook for state management
import './App.css'; // Import styles
import openDayData from './OpenDay.json'; // Import JSON data containing program details
import Navbar from './Navbar'; // Import Navbar component
import { Link } from "react-router-dom"; // Import Link for navigation between routes

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
  return defaultImages[Math.floor(Math.random() * defaultImages.length)]; // Select a random image from the list
};

function SubjectDetails() {
  const { topicIndex } = useParams(); // Extract topicIndex from the URL parameters

  // useState hooks to manage filter and search query
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract programs based on the topicIndex parameter
  const programs = openDayData.topics[topicIndex].programs;

  // Create an array of unique program types with "All" as the default option
  const programTypes = ["All", ...new Set(programs.map((program) => program.programType.type)),];

  // Filter programs based on the selected filter and search query
  const filteredPrograms = programs.filter((program) => {
    const matchesFilter = filter === "All" || program.programType.type === filter;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.description_short.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="SubjectDetails">
      
      {/* Display header image */}
      <div class="header_img">
        <img className="title_img" src={openDayData.topics[topicIndex].cover_image} alt="Description" />
      </div>
    
      {/* Display topic name as header */}
      <div class="header">
        <h1>{openDayData.topics[topicIndex].name}</h1>
      </div>

      {/* Navbar component with search state update function */}
      <Navbar setSearchQuery={setSearchQuery}/>
        
      <div class="body">
        
        {/* Display topic description */}
        <p class="subtitle">{openDayData.topics[topicIndex].description}</p>

        <h1 class="event_subtitle">Explore {openDayData.topics[topicIndex].name} Open Day Events</h1>
        
        {/* Filter dropdown for selecting event type */}
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

        {/* Display filtered programs */}
        <div class="card_container">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, index) => (
              <div class="card" key={index}>
                <header class="card_header">
                  {/* Display program image or a random default image */}
                  <img 
                    className="img_2" 
                    src={program.cover_image || getRandomImage()} 
                    alt="Programs" 
                  />
                </header>

                {/* Display program title with a link to its details */}
                <div>
                  <h2><Link to={`/topic/${topicIndex}/program/${index}`}>{program.title}</Link></h2>
                </div>

                {/* Display program description */}
                <div class="card_description">
                  <p>{program.description_short}</p>
                </div>

                {/* Display program type in footer */}
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
};

export default SubjectDetails; // Export the SubjectDetails component