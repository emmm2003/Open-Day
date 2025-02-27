import React, { useState }  from 'react';
import './App.css';
import openDayData from './OpenDay.json';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

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

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const programs = openDayData.topics[0].programs;

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
      
      <div class="header">
        <h1>{openDayData.description} 
          <span style={{ fontSize: "0.4em", fontWeight: "normal" }}>
            {formatDateTime(openDayData.start_time, openDayData.end_time)}
          </span>
        </h1>
      </div>

      <Navbar setSearchQuery={setSearchQuery}/>

      <div class="body">
        
        <p class="subtitle">Choose how you want to experience our campuses and explore your new city. We offer in-person events, webinars, and virtual tours so you can get to know Cardiff University in a way that works for you.</p>

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

        <div className="card_container">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, index) => (
              <div className="card" key={index}>
                <header className="card_header">
                  <img className="img_2" src={program.cover_image || "no_image.jpg"} alt="Residence" />
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

export default Homepage;
