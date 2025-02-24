import { useParams } from "react-router-dom";
import React, { useState }  from 'react';
import './App.css';
import openDayData from './OpenDay.json';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const SubjectDetails = () => {
  const { topicIndex } = useParams(); // Get both params

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const programs = openDayData.topics[topicIndex].programs;

  const programTypes = ["All", ...new Set(programs.map((program) => program.programType.type)),];

  const filteredPrograms = programs.filter((program) => {
    const matchesFilter = filter === "All" || program.programType.type === filter;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.description_short.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="SubjectDetails">
      
      <div class="header_img">
        <img className="title_img" src={openDayData.topics[topicIndex].cover_image} alt="Description" />
      </div>
    
      <div class="header">
        <h1>{openDayData.topics[topicIndex].name}</h1>
      </div>

      <Navbar setSearchQuery={setSearchQuery}/>
        
      <div class="body">
        
        <p class="subtitle">{openDayData.topics[topicIndex].description}</p>

        <h1 class="event_subtitle">Explore {openDayData.topics[topicIndex].name} Open Day Events</h1>
        
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

        <div class="card_container">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, index) => (
              <div class="card" key={index}>
                <header class="card_header">
                  <img 
                    className="img_2" 
                    src={program.cover_image || "/no_image.jpg"} 
                    alt="Programs" 
                  />
                </header>

                <div>
                  <h2><Link to={`/topic/${topicIndex}/program/${index}`}>{program.title}</Link></h2>
                </div>

                <div class="card_description">
                  <p>{program.description_short}</p>
                </div>

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

export default SubjectDetails;
