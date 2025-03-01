// Importing necessary modules from React and react-router-dom for routing
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing components for different pages/views in the application
import HomePage from './Homepage';
import Degrees from './Degrees';
import Residences from './Residences';
import Life from './Life';
import ProgramDetails from './ProgramDetails';
import SubjectDetails from './SubjectDetails';

// Main App component where routing is configured
function App() {
  return (
    // Router component to enable routing functionality for the application
    <Router>
        <Routes>
          {/* Route for the home page, both for root and '/home' */}
          <Route path="" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          
          {/* Route for the various page */}
          <Route path="/degrees" element={<Degrees />} />
          <Route path="/residences" element={<Residences />} />
          <Route path="/life" element={<Life />} />
          
          {/* Dynamic routes for program and subject details, based on topicIndex and programIndex */}
          <Route path="/topic/:topicIndex/program/:programIndex" element={<ProgramDetails />} />
          <Route path="/topic/:topicIndex/" element={<SubjectDetails />} />
        </Routes>
    </Router>
  );
}

// Exporting the App component as the default export
export default App;
