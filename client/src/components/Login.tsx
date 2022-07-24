import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import axios from 'axios'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [reg, setReg] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit=()=>{
    if(reg){
        axios.post("https://apimyshoes.herokuapp.com/login",{username,password}).then((r)=>{
            if(r.data.token){
                Cookies.set("token",r.data.token)
                setOpen(false);
                swal.fire({
                    title: 'Login Success',
                    text: `Now you can upload products!`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
            }
            else{
                setOpen(false);
                swal.fire({
                    title: 'Error!',
                    text: `${r.data.message}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        })
    }
    else{
        axios.post("https://apimyshoes.herokuapp.com/signup",{username,password}).then((r)=>{
            setOpen(false);
            if(r.data.message==="Successfully registered"){
                swal.fire({
                    title: 'Account Registered',
                    text: `Successfully registered`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
            }
            else{
                setOpen(false);
                swal.fire({
                    title: 'Error!',
                    text: `${r.data}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        })
    }
  }

  return (
    <div>
        <Typography onClick={handleClickOpen}>Login/Register</Typography>
      {/* <Button onClick={handleClickOpen}>
        Login/Register
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{reg?"Login":"Register"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {reg?"Login into MyShoes":"Register into MyShoes"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={(e)=>setUsername(()=>(e.target as HTMLInputElement).value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e)=>setPassword(()=>(e.target as HTMLInputElement).value)}
          />
          <Box sx={{display:'flex',justifyContent:'center',mt:2}}>
            <Typography>{!reg?"Have Acoount?":"Not Have Account?"}</Typography>
            <Typography sx={{ml:0.5,color:'green',textDecoration:"underline",cursor:"pointer"}} onClick={()=>setReg((prev)=>!prev)}> {!reg?"Login":"Create"}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>{reg?"Login":"Register"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
