import React from 'react';

import Navbar from './components/Navbar';
// Adding the rout browsing package from react 
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Pages/Home';
import Breaking_bad_api from './components/Pages/Breaking_bad_api';
import Robot from './components/Pages/Robot';
// importing the pages  
function App() {

  return (
    <>
      <Router>
      < Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path = "/Breaking_bad_api" element={<Breaking_bad_api/>}/>
          <Route exact path = "/Robot" element={<Robot/>}/>
        </Routes>
      </Router> 
    </>
  );
}

export default App;
