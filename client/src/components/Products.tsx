import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';
import CardComponent from './Card';
import * as Int from '../interfaces'
import { useState,useEffect } from 'react';


const Products = () => {
    var [products,setProducts]=useState<Int.Product[]>([])
    React.useEffect(()=>{
        fetch("http://localhost:3000/products").then((res)=>res.json()).then(data=>setProducts(()=>data as Int.Product[]))
    },[])
  return (
    <Box >
        <Box sx={{display:'flex',justifyContent:'flex-start',color:'white',marginY:2,marginX:2}}>
            <Typography id="scroll1" sx={{fontSize:'5vw',fontFamily:'Ailerons' }} className='Meet' >Meet our products!</Typography>
        </Box>
        <Box sx={{marginX:5,mb:10}}>
            <Grid container spacing={5}>
                {products.map((product:Int.Product)=>(
                    <Grid item xs={6} md={3}>
                    <CardComponent {...product}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
  );
};
export default Products;
