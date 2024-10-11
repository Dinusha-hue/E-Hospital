import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AddRequestPage from './components/AddRequestPage';
import EditRequestPage from './components/EditeRequestPage';
import RequestDetails from './components/RequestDetails';
import ViewRequests from './components/ViewRequests';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-request" element={<AddRequestPage />} />
        <Route path="/edit-request/:id" element={<EditRequestPage />} />
        <Route path="/show-requests/:id" element={<RequestDetails/>} />
        <Route path="/view-requests" element={<ViewRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
