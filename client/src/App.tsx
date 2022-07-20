import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing'
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
