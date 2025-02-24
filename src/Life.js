import React, { useState }  from 'react';
import openDayData from './OpenDay.json';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import './App.css';

function Life() {

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDegrees = openDayData.topics.slice(1,3).filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Life">

      <div class="header_img">
        <img className="title_img" src={openDayData.topics[1].cover_image} alt="Description" />
      </div>
      
      <div class="header">
        <h1>Student Life Events</h1>
      </div>

      <Navbar setSearchQuery={setSearchQuery}/>

      <div class="body">

        <p class="subtitle">Cardiff University is a place where you can develop academically, grow as a person and expand your social circle. You'll belong to a community that cares about your wellbeing, with help available to you at any time.</p>

        <div class="card_container">
          {filteredDegrees.length > 0 ? (
            filteredDegrees.map((topic, index) => (
              <div class="card" key={index}>
                <header class="card_header">
                  <img 
                    className="img_2" 
                    src={topic.cover_image || "no_image.jpg"} 
                    alt="Residence" 
                  />
                </header>

                <div>
                  <h2><Link to={`/topic/${index + 1}`}>{topic.name}</Link></h2>
                </div>

                <div class="card_description">
                  <p>{topic.description}</p>
                </div>
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

export default Life;