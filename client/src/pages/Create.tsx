import { Box, CardMedia, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import NavBar from '../components/NavBar'
import * as Int from '../interfaces'
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';
import swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';
import Cookie from "js-cookie"

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
    const navigate=useNavigate()
    const defaultImg="https://es.letrag.com/caracteres/2b.png"
    const [product,setProduct]=useState<Int.Product>({
        _id:'',
        name:'Product name',
        image_url:[defaultImg],
        description:'',
        price:0,
        brand:{
            _id:"",
            name:'',
            logo_url:defaultImg}
    })
    const [dummy,setDummy]=useState({
        name:'Product name',
        description:'',
        price:0,
        brand:{
            name:''
        }
    })
    const [image,setImage]=useState<string>(defaultImg)
    

    useEffect(()=>{
        window.scroll(0,0)
        if(!Cookie.get("token"))navigate("/")
    },[])

    const handleUpload=(etarget:HTMLInputElement,brand?:boolean)=>{
        const pic = etarget.files;
        let formData=new FormData();
        formData.append('file',pic![0]);
        formData.append('upload_preset','uroim98f');
        fetch('https://api.cloudinary.com/v1_1/fotosnicoamicone/upload',{
            method: 'POST',
            body: formData,
        })
            .then((res)=>res.json())
            .then((res)=> {
            if(brand){
                setProduct((old)=>({...old,brand:{...old.brand,logo_url:res.url}}))
                return 
            }
            
            else{
                if(image===defaultImg)setImage(()=>res.url)
               product.image_url.forEach((e,index)=>{
                let aux=product.image_url
                if(e===defaultImg){
                    aux[index]=res.url
                    if(aux.length<4)aux.push(defaultImg)
                    setProduct((old)=>({...old,image_url:aux}))
                }
               })
            }
            })
            .catch(error=>console.log(error));
    }

    const checkButton=(field:keyof typeof dummy)=>{
        return(
            <IconButton 
            sx={{background: "-webkit-linear-gradient(#85ff33, rgb(0, 170, 85));",m:1,maxWidth:40}}
            onClick={()=>{
                if(field==="brand") return setProduct((old)=>({...old,brand:{...old.brand,name:dummy.brand.name}}))
                setProduct((old)=>({...old,[field]:dummy[field]}))
            }}
            >
                <CheckIcon sx={{color:"white"}}/>
            </IconButton>
        )
    }
  return (
    <Box>
        <NavBar/>
        <input 
              aria-label="Archivo" 
              type="file" name="imagen"
              onChange={(e)=>handleUpload(e.target)}
              style={{ display: 'none' }}
              className="inputbtn"
            />
            <input 
              aria-label="Archivo" 
              type="file" name="imagen"
              onChange={(e)=>handleUpload(e.target,true)}
              style={{ display: 'none' }}
              className="inputbtnimage"
            />
        <Box sx={{mt:{xs:'250px',md:10},display:'flex',justifyContent:'center',height:"100vh"}}>
            <Box sx={{display:'flex',justifyContent:'center',maxHeight:508,flexDirection:{xs:'column',md:'row'}}}>
                <Box sx={{display:'flex',flexDirection:'column',maxWidth:{xs:294,md:500},marginX:'auto'}}>
                <CardMedia
                component="img"
                image={image}
                sx={{height:{xs:280,md:400},width:{xs:294,md:420},objectFit:"contain",bgcolor:"white",minHeight:{xs:280,md:400},minWidth:{xs:294,md:420},cursor:"pointer"}}
                onClick={ () => {
                    let element: HTMLElement = document.getElementsByClassName('inputbtn')[0] as HTMLElement;
                    element.click()
                } }
                />
                <Grid sx={{mt:1,display:'flex',maxWidth:'100%'}} container spacing={1}>
                    {product.image_url.map(e=>(
                        <Grid item xs={3}>
                        <CardMedia
                        component="img"
                        image={e}
                        sx={{height:{xs:70,md:100},width:{xs:70,md:100},cursor:"pointer"}}
                        onClick={ () => {
                            let element: HTMLElement = document.getElementsByClassName('inputbtn')[0] as HTMLElement;
                            element.click()
                        } }/>
                        </Grid>
                    ))}
                </Grid>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column',ml:{xs:0,md:2},alignItems:'center',maxWidth:600,marginX:{xs:2},mt:{xs:2,md:0}}}>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <CardMedia
                        component="img"
                        image={product.brand.logo_url || defaultImg}
                        sx={{width:50,height:50,cursor:"pointer"}}
                        onClick={ () => {
                            let element: HTMLElement = document.getElementsByClassName('inputbtnimage')[0] as HTMLElement;
                            element.click()
                        } }
                        />
                        {product.brand.name!==""?
                        <Typography sx={{color:'white',fontFamily:'ailerons',fontSize:20,}}>{product.brand.name}</Typography>
                        :
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <TextField onChange={(e)=>setDummy((old)=>({...old,brand:{...old.brand,name:e.target.value}}))} className="textfields" label="Product Brand" variant="outlined" color="success" focused size='small' sx={{ml:2}}/>
                            {checkButton("brand")}
                        </Box>
                    }
                    </Box>
                    <Box  sx={{display:'flex',flexDirection:'column',ml:{xs:0,md:2},alignItems:'center',maxWidth:'100%',marginX:{xs:2}}}>

                        {!(product.name==='Product name')?
                        <Typography sx={{color:'white',fontSize:{xs:35,md:45},fontWeight:700}} className='Meet'>{product.name}</Typography>
                        :<Box sx={{display:'flex',alignItems:'flex-end'}}>
                            <TextField onChange={(e)=>setDummy((old)=>({...old,name:e.target.value}))} className="textfields" label="Product Name" variant="outlined" color="success" focused fullWidth size='medium' sx={{mt:2}}/>
                            {checkButton("name")}
                        </Box>
                    }

                        {product.price!==0?
                        <Typography sx={{color:'white',fontWeight:700,fontSize:30}} className='Meet'>${product.price}</Typography>
                        :
                        <Box sx={{display:'flex',alignItems:'flex-end'}}>
                            <TextField type="number" onChange={(e)=>setDummy((old)=>({...old,price:parseInt(e.target.value)}))} className="textfields" label="Product Price" variant="outlined" color="success" focused fullWidth size='medium' sx={{mt:2}}/>
                            {checkButton("price")}
                        </Box>
                        }

                        <Box className='fondoblanco' sx={{p:3,borderRadius:3,minWidth:{xs:'50%',md:'100%'},height:'100%',boxShadow:'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',mt:2}}>
                            <Box sx={{display:'flex',justifyContent:'flex-start'}}>
                                <Typography sx={{color:'black',fontWeight:500,fontSize:20}} >Product Description</Typography>
                            </Box>
                            <Divider/>
                            <Box component="div" sx={{overflow:'auto',mt:2}}>
                                {product.description!==""?
                                <Typography textAlign="left" sx={{maxWidth:200,height:200}}>{product.description}</Typography>
                                :
                                <Box sx={{display:'flex',flexDirection:"column",alignItems:"center"}}>
                                    <TextField multiline onChange={(e)=>setDummy((old)=>({...old,description:e.target.value}))} variant="outlined" color="success" focused fullWidth size='medium' sx={{mt:1,overflow:'auto',maxHeight:150,mb:1}}/>
                                    {checkButton("description")}
                                </Box>
                                }
                            </Box>
                        </Box>
                                <IconButton
                                sx={{background: "-webkit-linear-gradient(#85ff33, rgb(0, 170, 85));",m:1,maxWidth:90,fontSize:15,borderRadius:2,p:1}}
                                onClick={()=>{
                                    const token = Cookie.get("token")
                                    axios.post("http://localhost:3000/products",{
                                        name:product.name,
                                        description:product.description,
                                        price:product.price,
                                        image_url:product.image_url,
                                        brand:product.brand.name,
                                        logo_url:product.brand.logo_url
                                    },{
                                        headers:{
                                            "x-access-token":token as string
                                        }
                                    }).then((res)=>{
                                        if(res.data==="Product created successfully"){
                                            swal.fire({
                                                title: 'Product Created',
                                                text: `Now you can see your product in the homepage`,
                                                icon: 'success',
                                                confirmButtonText: 'Ok'
                                              }).then((res)=>{
                                                if(res.isConfirmed)navigate("/")
                                              })
                                        }
                                        else{
                                            swal.fire({
                                                title: 'Product cannot be created',
                                                text: `Please upload all images and fill the fields to create the product`,
                                                icon: 'error',
                                                confirmButtonText: 'Ok'
                                              })
                                        }
                                    })


                                }}
                                >
                                    <PublishIcon />
                                    Publicar
                                </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  );
}