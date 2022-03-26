import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {domain} from '../../../connection/Config'
import { ToastContainer, toast } from 'react-toastify';
export default function Rejected({setRefresh,newOrder,index,token,setNewOrder}) {
    const [open, setOpen] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reject_order= async()=>{
      try{
        const res = await fetch(`${domain}/orders/ready`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                token:token,  
                order_id:newOrder[index].id
                }
                ) 
        }
        ) 
     const data= await res.json()
      if(data.status){
        toast(data.status)
        let filter_arr= newOrder.filter(el=>el.id !== newOrder[index].id)
        setNewOrder(filter_arr)
        setOpen(false);
      }
      }
      catch(err){
          console.log(err)
      }
  }
    return (
        <>
         <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> לביטול הזמנה לחצו אישור. ומיד לאחר מכן התקשרו לרום ועדכנו אותו על ביטול ההזמנה </DialogTitle>
        <DialogContent>
      
        </DialogContent>
        <DialogActions>
          <Button onClick={reject_order} color="primary">
           אישור
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
           ביטול
          </Button>
        </DialogActions>
      </Dialog>
    </>
    )
}
