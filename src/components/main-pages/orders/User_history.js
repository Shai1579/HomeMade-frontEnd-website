import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {DialogTitle,Grid} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { domain } from '../../../connection/Config';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
export default function UserHistory({token,user_id,order_id}) {
    const [open, setOpen] = React.useState(false);
    const [history, setHistory]=useState([])
    const handleClickOpen = async() => {
  try{
      console.log(order_id)
    const res2 = await fetch(`${domain}/user_history`,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
       token:token,
       user_id:user_id,
        order_id:order_id     
            }
            )
    }
    ) 
    const data = await res2.json()
    setHistory(data.preview_order)
    if(data){
        setOpen(true);
    }
  }
  catch(err){
      console.log(err)
  }
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
           היסטוריית הזמנות של הלקוח
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
              <DialogTitle id="alert-dialog-slide-title">פרטי הלקוח</DialogTitle>
              {history.length?
              <>
               
               <DialogContent>
                   <div>
                       <h4>לקוח קבוע</h4>
                       <Divider/>
                   </div>
                 <DialogContentText id="alert-dialog-slide-description">
                   {
                       history.map(el=>{
                           return(
                               <>
                           <Grid style={{margin:'10px'}}>
                               <Grid>
                                  : מתאריך<br/>
                              <span style={{fontWeight:'700'}}>{new Date(el.date).toLocaleString(undefined,{weekday: "short",year: "numeric",month: "2-digit",day: "numeric"})}</span> 
                               </Grid>
                               <Grid>
                                {el.items.map(item=>{
                                    return(
                                      <Grid>
                                     שם המנה : <span style={{fontWeight:'700'}}>{item.name}</span>
                                      </Grid>
                                    )
                                })}
                                   </Grid>
                                   <Grid>
                                    <p style={{fontWeight:'700'}}>{el.feedback}</p>
                                   </Grid>
                           </Grid>
                           <Divider/>
                           </>
                           )
                       })
                   }
                 </DialogContentText>
               </DialogContent>
               
               </>
              :<>
              <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                       <h2 style={{padding:'10px'}}> :)זה הזמנה ראשונה של הלקוח! בהצלחה </h2>
                       <Divider/>
                   </div>
                   
                   </>}
           
          </Dialog>
        </div>
      );
}
