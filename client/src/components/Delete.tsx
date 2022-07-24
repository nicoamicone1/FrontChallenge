import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import * as Int from "../interfaces"
import axios from 'axios';
import { Box, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from "sweetalert2"
import Cookie from "js-cookie"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;



  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Int.Product[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{
        axios("https://apimyshoes.herokuapp.com/products").then((res)=>setProducts(()=>res.data))
  })

  const handleDelete=(product:Int.Product)=>{
    setOpen(false);
    swal.fire({
        title: 'Are you sure you want to delete the product?',
        text: `About to erase ${product.name.slice(0,23)}`,
        icon: 'error',
        showCancelButton:true,
        cancelButtonText:"Cancel",
        confirmButtonText:"Ok",
        reverseButtons:true
      }).then((res)=>{
        if(res.isConfirmed){
            const token=Cookie.get("token")
            axios.delete(`https://apimyshoes.herokuapp.com/products/${product._id}`,{
                headers:{
                    "x-access-token":token as string
                }
            }).then((res)=>{
                if(res.data.message==="Product deleted successfully"){
                    swal.fire({
                        title: 'Product deleted',
                        text: ``,
                        icon: 'success',
                      }).then((res)=>{
                        if(res.isConfirmed)window.location.reload()
                      })                     
                }else{
                    swal.fire({
                        title: 'Product cannot be deleted',
                        text: ``,
                        icon: 'error',
                      })
                }
            })
        }
      })
}
  return (
    <div>
      <Typography onClick={handleClickOpen}>Delete products</Typography>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Delete Products
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{overflow:"auto"}}>
          {products.map((product)=>(
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <CardMedia
                component="img"
                image={product.image_url[0]}
                sx={{width:50,height:50,objectFit:"contain"}}
                />
                <Box sx={{display:"flex",justifyContent:"flex-start",width:"100%"}}>
                    <Typography sx={{fontWeight:500,ml:2}}>{product.name.slice(0,23)}</Typography>
                </Box>
                <IconButton color="error" sx={{ml:2}} onClick={()=>handleDelete(product)}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
          ))}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
