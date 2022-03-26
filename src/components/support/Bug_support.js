import React from 'react'
import '../../css/support.css'
export default function Bug_support() {
    return (
       <div style={{minHeight:'85vh',}}>
        <div className='header'>
            <h3>
                לכל בעיה טכנית\באגים באתר ניתן לפנות אלי בכל שעות היום
            </h3>
        </div>
        <div className='content'>
        <div className='name-warper'>
              <h3 style={{borderBottom: "yellowgreen 1px solid",paddingBottom:'10px',width:'300px',margin:'auto'}}>אופק מאירי</h3>
           </div>
            <div className='cube-info'>
       
           <div className='info-warper'>
               <p  className='info'> <span className='span-info'>0509128880</span> :מספר טלפון</p>
           </div>
           <div className='info-warper'>
           <p  className='info'> <span className='span-info'>ofekme19@gmail.com</span> :אימייל</p> 
           </div>
           <div className='info-warper'>
           <p  className='info'> <span className='span-info'>0509902762</span> :לתקלות בנתונים </p> 
           </div>
           </div>
        </div>
       </div>
    )
}
