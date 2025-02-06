import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDetail from './pages/DoctorDetail';
import DoctorList from './pages/DoctorList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
