import React, { useState } from 'react';
import openDayData from './OpenDay.json';
import Navbar from './Navbar';
import { Link } from "react-router-dom";


function Degrees() {

  const [searchQuery, setSearchQuery] = useState("");

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
      
      <Navbar setSearchQuery={setSearchQuery}/>

      <div class="body">

        <p class="subtitle">At Cardiff University, you can choose from over 300 degree programmes. We offer flexibility so you can tailor some components of your degree to suit your own interests and career ambitions.</p>

        <div className="card_container">
          {filteredDegrees.length > 0 ? (
            filteredDegrees.map((topic, index) => (
              <div className="card" key={index}>
                <header className="card_header">
                  <img className="img_2" src={topic.cover_image || "no_image.jpg"} alt="Residence" />
                </header>

                <div>
                  <h2><Link to={`/topic/${index + 4}`}>{topic.name}</Link></h2>
                </div>

                <div className="card_description">
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

export default Degrees;
