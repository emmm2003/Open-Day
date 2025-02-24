import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage';
import Degrees from './Degrees';
import Residences from './Residences';
import Life from './Life';
import ProgramDetails from './ProgramDetails';
import SubjectDetails from './SubjectDetails';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/degrees" element={<Degrees />} />
          <Route path="/residences" element={<Residences />} />
          <Route path="/life" element={<Life />} />
          <Route path="/topic/:topicIndex/program/:programIndex" element={<ProgramDetails />} />
          <Route path="/topic/:topicIndex/" element={<SubjectDetails />} />
        </Routes>
    </Router>
  );
}

export default App;
