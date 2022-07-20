import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';
import CardComponent from './Card';
import * as Int from '../interfaces'

const products=[{
    name:'Nike AirMax 2022',
    image_url:'https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5d2cf9e4/products/NI_DC3728-003/NI_DC3728-003-1.JPG',
    description:'asas',
    price:200,
    brand:'Nike'
},{
    name:'Adidas Running F50',
    image_url:'https://falabella.scene7.com/is/image/FalabellaCO/6934395_1?wid=800&hei=800&qlt=70',
    description:'asas',
    price:458,
    brand:'Nike'
},{
    name:'Vans Street Ds2',
    image_url:'https://http2.mlstatic.com/D_NQ_NP_676768-MLA49829727272_052022-O.webp',
    description:'asas',
    price:3609,
    brand:'Nike'
},{
    name:'Adidas Running F50',
    image_url:'https://falabella.scene7.com/is/image/FalabellaCO/6934395_1?wid=800&hei=800&qlt=70',
    description:'asas',
    price:58,
    brand:'Nike'
}]

const Products = () => {
  return (
    <Box >
        <Box sx={{display:'flex',justifyContent:'flex-start',color:'white',marginY:2,marginX:2}}>
            <Typography sx={{fontSize:'5vw',fontFamily:'Ailerons' ,color:'#85ff33'}} >Meet our products!</Typography>
        </Box>
        <Box sx={{marginX:5}}>
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
