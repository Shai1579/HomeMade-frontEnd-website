import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { domain } from '../connection/Config';
import { ToastContainer, toast } from 'react-toastify';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function Dialog_confirm({setDialog_triger,choosen_one,token,setRingtone}) {
     const change_ringtone= async()=>{
         try{
            const res2 = await fetch(`${domain}/cookers-admin`,
            {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(
                    {
                        id:token,
                       ringtone:choosen_one
                    }
                    ) 
            }
            )
           const data = await res2.json()
           toast(data.status)
           setRingtone(choosen_one)
           setDialog_triger(false)
         }
         catch(err){
             console.log(err)
         }
       
     }
    const handleClose = () => {
      setDialog_triger(false);
    };
  
    return (
        <div>
            
            <ToastContainer />
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"> ? זה הרינגטון שבחרת</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <iframe title='dialogIframe' style={{width:'100%'}}  src={choosen_one}>
          </iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick  variant='outlined' onClick={handleClose} color="primary">
           חזור ובטל
          </Button>
          <Button variant='outlined' onClick={change_ringtone} color="primary">
           שנה צליל התראה
          </Button>
        </DialogActions>
      </Dialog> 
        </div>
    )
}
