import React,{useState} from 'react'
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Credit_auth from './Credit_auth';
import {domain} from '../../../connection/Config'





const Transition = React.forwardRef(function Transition(props, ref) {
 
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Bt_money({setCash_withrawal,total_profit,token,cooker}) {
     const[sum,setSum]=useState(0)
     const[iban,setIban]=useState('')
     const[full_name,setFull_name]=useState('')
     const[address,setAddress]=useState('')
     const[city,setCity]=useState('')
    const [open, setOpen] = React.useState(false);
     const [page,setPage]=useState('start')
     const [answer, setAnswer] = useState('');
    const handleClickOpen = () => {
      setOpen(true);
    };

    const continue_page=(e)=>{
      e.preventDefault()
      if(sum>0 &&sum<=total_profit){
        setPage('question')
      }
     
        else{
          alert(`ניתן למשוך עד סכום היתרה שלך. שעומדת על :${total_profit}₪`)
        }
      
    }
   const transfer= async()=>{
     if(answer === cooker.answer){
      const res2 = await fetch(`${domain}/balance`,
      {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                amount:sum,
                full_name:full_name,
               iban:iban,
                cash_withrawal:total_profit,
                token:token,
                Address:address,
                city:city,
                email:cooker.email
              }
              ) 
      }
      )
      const data= await res2.json()
      if(data.success == true){
        setPage('success')
      }
      else{
        setPage('faild')
      }
     }
     else{
       alert('.תשובתך אינה נכונה, נסה שוב')
     }
       
   }



    return (
        <>
        <Button onClick={handleClickOpen} variant='outlined' className='buttons'>
        משוך כסף מיתרה
    </Button>
   

    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
       
      >
         {page == 'start'? 
        <> 
         <form onSubmit={continue_page}>
        <DialogTitle id="alert-dialog-slide-title">משיכת כסף לחשבון בנק</DialogTitle>
        <DialogContent>
{/*  
        <h3>
      . פיטצ'ר בבנייה
        </h3>
        <p>
      . לקבלת פרטים נוספים לפנות לרום
        </p> */}
        <Grid>
          <h4>סכום יתרה:<span  className='amount_money'>{total_profit}₪</span></h4>
        </Grid>
       

       
         <Grid>
            <TextField required onChange={(e)=>{setFull_name(e.target.value)}} className='cash-pull-field' label=':שם מלא באנגלית' />
            </Grid>
            <Grid>
            <TextField required onChange={(e)=>{setIban(e.target.value)}} className='cash-pull-field' label=':IBAN מספר ' />
            <Grid><p style={{fontSize:"11px",width:"270px"}}>ניתן למצוא את המספר המבוקש באפליקציה\אתר של חשבון הבנק שלכם</p></Grid>
            </Grid>
         
            <Grid>
            <TextField required onChange={(e)=>{setCity(e.target.value)}} className='cash-pull-field' label=':עיר מגורים באנגלית' />
            </Grid>
             
         <Grid>
            <TextField required onChange={(e)=>{setAddress(e.target.value)}} className='cash-pull-field' label=':כתובת באנגלית' />
            </Grid>
            <Grid>
            <TextField required type='number' onChange={(e)=>{setSum(e.target.value)}} className='cash-pull-field' label=':סכום העברה' />
            </Grid>
            
           
           
 
        </DialogContent>
        <DialogActions>
          <Grid style={{width:'100%',display:'flex',justifyContent:'center'}}>
          <Button  className='buttons' variant='outlined' type='submit' color="primary">
         המשך
          </Button>
          <Button  className='buttons' variant='outlined' onClick={()=>{setOpen(false)}} color="primary">
         חזור לדף הבית
          </Button>
          </Grid>
        </DialogActions>
        </form>
        </>
       :page=='question'?
       <> 
       <DialogTitle id="alert-dialog-slide-title">   שאלת אבטחה לפני שנבצע את העברה </DialogTitle>
       <DialogContent>
      <Grid>
      <h4>{cooker.question}</h4>
      </Grid>
      <Grid>
            <TextField onChange={(e)=>{setAnswer(e.target.value)}}  className='cash-pull-field' label=':תשובה' />
            </Grid>
          
          

       </DialogContent>
       <DialogActions>
         <Grid style={{width:'100%',display:'flex',justifyContent:'center'}}>
         <Button  className='buttons' variant='outlined' onClick={transfer} color="primary">
        אשר ובצע העברה
         </Button>
         <Button  className='buttons' variant='outlined' onClick={()=>{setPage('start')}} color="primary">
      חזור אחורה
        </Button>
         </Grid>
         
       </DialogActions>
       </>
      :page== 'success'?
      <> 
      <DialogTitle id="alert-dialog-slide-title">  :) העברה בוצעה בהצלחה </DialogTitle>
      <DialogContent>
    
     
         

      </DialogContent>
      <DialogActions>
        <Grid style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Button  className='buttons' variant='outlined' onClick={()=>{setOpen(false)}} color="primary">
       חזור לדף הבית
        </Button>
        </Grid>
        
      </DialogActions>
      </>
    :
    <> 
      <DialogTitle id="alert-dialog-slide-title">  :( העברה נכשלה </DialogTitle>
      <DialogContent>
    
     
         

      </DialogContent>
      <DialogActions>
        <Grid style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <Button  className='buttons' variant='outlined' onClick={()=>{setOpen(false)}} color="primary">
       חזור לדף הבית
        </Button>
        <Button  className='buttons' variant='outlined' onClick={()=>{setPage('start')}} color="primary">
      חזור אחורה
        </Button>
        </Grid>
        
      </DialogActions>
      </>
    }
      </Dialog>
    </>
    )
}
