import { Box } from '@mui/material';
import * as React from 'react';
import Carrusel from '../components/Carrusel';
import NavBar from '../components/NavBar'
import Products from '../components/Products';

const Landing = () => {
  return (
    <div>
        <NavBar/>
        <Carrusel/>
        <Products/>
        <Box sx={{height:2000}}></Box>
    </div>
  );
};
export default Landing;
