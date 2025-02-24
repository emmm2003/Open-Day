import { useParams } from "react-router-dom";
import React from 'react';
import './App.css';
import openDayData from './OpenDay.json';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ProgramDetails = () => {
  const { topicIndex, programIndex } = useParams();

  const containerStyle = {
    width: "100%",
    height: "500px",
    border: "1px solid black",
  };
  
  const center = {
    lat: openDayData.topics[topicIndex].programs[programIndex].location.latitude,  
    lng: openDayData.topics[topicIndex].programs[programIndex].location.longitude,  
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };
  
  const start_time = openDayData.topics[topicIndex].programs[programIndex].start_time;
  const end_time = openDayData.topics[topicIndex].programs[programIndex].end_time;
  
  const formattedDate = formatDateTime(start_time);
  const startTime = formatTime(start_time);
  const endTime = formatTime(end_time);  
  
  return (
    <div className="ProgramDetails">
      
      <div class="header_img">
        <img className="title_img" src={openDayData.topics[topicIndex].cover_image} alt="Description" />
      </div>
    
      <div class="header">
        <h1>{openDayData.topics[topicIndex].programs[programIndex].title}</h1>
      </div>

      <Navbar />

      <div class="body">

      <div class="row">
        <div class="column side">
        <Link to={`/topic/${topicIndex}`}><button class="button">Back to {openDayData.topics[topicIndex].name} Events</button></Link>
        </div>
        <div class="column middle">
          <p class="subtitle">{openDayData.topics[topicIndex].programs[programIndex].description}</p>
      
          <h1 class="program_date">{formattedDate}, {startTime} - {endTime}</h1>
          <h3 class="event_type">{openDayData.topics[topicIndex].programs[programIndex].programType.type}</h3>

          <h2 class="location"><a href={openDayData.topics[topicIndex].programs[programIndex].location.website}>{openDayData.topics[topicIndex].programs[programIndex].location.title} - {openDayData.topics[topicIndex].programs[programIndex].room}</a></h2>
          
          <div className="accessibility-container">
            {openDayData.topics[topicIndex].programs[programIndex].location.accessible === 1 && (
              <img className="icon" src="/disabled.png" alt="Accessible" />
            )}
            {openDayData.topics[topicIndex].programs[programIndex].location.parking === 1 && (
              <img className="icon" src="/car.png" alt="Parking" />
            )}
            {openDayData.topics[topicIndex].programs[programIndex].location.bike_parking === 1 && (
              <img className="icon bike" src="/bicycle.png" alt="Bike Parking" />
            )}
          </div>
          
          <img class="location_img" src={openDayData.topics[topicIndex].programs[programIndex].location.cover_image || "/no_image.jpg"} alt="Location" />

          <p class="address">{openDayData.topics[topicIndex].programs[programIndex].location.address}</p>
          <p class="postcode">{openDayData.topics[topicIndex].programs[programIndex].location.postcode}</p>

          <LoadScript googleMapsApiKey="AIzaSyA800cpEcjE8Hz2j8QJyYva4VJRHm38zhU">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>

          <div class="program_end"></div>
        </div>
      </div>
        
    </div>
  </div>
  );
};

export default ProgramDetails;
