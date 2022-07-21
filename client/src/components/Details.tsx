import { Box, CardMedia, Divider, Typography } from '@mui/material';
import NavBar from './NavBar'
import * as Int from '../interfaces'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const product={
//     _id:'021232131',
//     name:'Nike AirMax 2022',
//     image_url:['https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5d2cf9e4/products/NI_DC3728-003/NI_DC3728-003-1.JPG','https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5d2cf9e4/products/NI_DC3728-003/NI_DC3728-003-1.JPG','https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5d2cf9e4/products/NI_DC3728-003/NI_DC3728-003-1.JPG','https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5d2cf9e4/products/NI_DC3728-003/NI_DC3728-003-1.JPG'],
//     description:'Inspiradas en los diseños vanguardistas de la década de 2000, las Air Max Genome agregan una nueva cara a la casa Air Max con un diseño fabricado con al menos un 20 % de material reciclado en peso. Su parte superior de estilo tecnológico utiliza una combinación de materiales que incluyen pieles sin costuras, malla ventilada y detalles duraderos de TPU. La unidad Air de perfil bajo y longitud completa agrega comodidad a juego. Elegante y refinado, seguramente se convertirá en tu nuevo Air Max favorito.',
//     price:200,
//     brand:'Nike',
//     logo_url:'https://chelsfieldlakes.co.uk/wp-content/uploads/2017/08/nike-logo-white.png'
// }

export default function ProductDetails() {
    const {id}=useParams()
    const [product,setProduct]=useState<Int.Product>({
        _id:'',
        name:'',
        image_url:[''],
        description:'',
        price:999,
        brand:{
            _id:"",
            name:'',
            logo_url:''}
    })

    useEffect(()=>{
        window.scroll(0,0)
        fetch(`http://localhost:3000/products/${id}`).then((res)=>res.json()).then(data=>setProduct(()=>data as Int.Product))
    },[])
  return (
    <Box>
        <NavBar/>
        <Box sx={{mt:{xs:'250px',md:9},display:'flex',justifyContent:'center',height:'100vh'}}>
            <Box sx={{display:'flex',justifyContent:'center',maxHeight:508,flexDirection:{xs:'column',md:'row'}}}>
                <Box sx={{display:'flex',flexDirection:'column',maxWidth:{xs:294,md:420},marginX:'auto'}}>
                <CardMedia
                component="img"
                image={product.image_url[0]}
                sx={{height:{xs:280,md:400},width:{xs:294,md:420},objectFit:"contain",bgcolor:"white"}}/>
                <Box sx={{display:'flex',mt:1,justifyContent:'space-between'}}>
                    {product.image_url.map(e=>(
                        <CardMedia
                        component="img"
                        image={e}
                        sx={{height:{xs:70,md:100},width:{xs:70,md:100}}}/>
                    ))}
                </Box>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column',ml:{xs:0,md:2},alignItems:'flex-start',maxWidth:600,marginX:{xs:2}}}>
                    <Box>
                        <Typography sx={{color:'white',fontFamily:'ailerons',fontSize:20,display:{xs:'none',md:'block'}}}>{product.brand.name}</Typography>
                    </Box>
                    <Typography sx={{color:'white',fontSize:{xs:35,md:50},fontWeight:700}} className='Meet'>{product.name}</Typography>
                    <Typography sx={{color:'white',fontWeight:700,fontSize:30}} className='Meet'>${product.price}</Typography>
                    <Box sx={{bgcolor:'white',p:3,borderRadius:3,minWidth:{xs:'50%',md:'100%'},height:'100%',boxShadow:'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;'}}>
                        <Box sx={{display:'flex',justifyContent:'flex-start'}}>
                            <Typography sx={{color:'black',fontWeight:500,fontSize:20}} >Product Description</Typography>
                        </Box>
                        <Divider/>
                        <Box sx={{overflow:'auto',mt:2}}>
                            <Typography minWidth='100%' textAlign="left">{product.description}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  );
}