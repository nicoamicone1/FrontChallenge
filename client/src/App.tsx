import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing'
import Create from './pages/Create'
import ProductDetails from './pages/Details';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Cookie from 'js-cookie';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
