import React from 'react'
import '../css/login.css'
import{Modal,Backdrop,Fade} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm'
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: "rgb(241, 234, 230);",
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      
    },
  }));

export default function Login({token,setToken,tokenID,setTokenID}) {
    const classes = useStyles();
  // const [open, setOpen] = useState(true);
  const open = true;
    return (
        <div className='login-container'>
           <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
           <LoginForm
           setTokenID={setTokenID}
           tokenID={tokenID}
           setToken={setToken}
           token={token}
           />
          </div>
        </Fade>
        </Modal> 
        </div>
    )
}
