import React from 'react'
import Responsive_menu from "./Responsive_menu"
import '../../css/nav_bars.css'
import {Grid,Avatar,Badge} from '@material-ui/core';
import MenuNotifaication from './Menu_notifaication';
export default function ResponsiveNav({currentPage,orders_counter,setOrders_counter,
  setCurrentPage,
  width,cooker,setToken,setTokenID,newOrder}) {
    return (
        <div  className='nav'>
          <Grid className='warper'>
              <Grid id='name_profile_avatar' className='icons_profile_warper'>
                <Grid className="name" style={{display:'flex',flexDirection:'row'}}>
                <Grid  style={{paddingTop:'5px',paddingRight:"10px"}}>
                  <Avatar style={{width:"50px",height:'50px'}} src="Homemade.png"/>
                  </Grid>
                <Grid id='name_profile_avatar' >
                <h5>
                {cooker.vendor}
              </h5>
              </Grid> 
              
                </Grid>
                 

              </Grid>
             <Grid className='icons-header-warper'>
            
          
          <div className='icon-warper'>
          <Badge badgeContent={orders_counter} color="secondary">
          <MenuNotifaication
          setOrders_counter={setOrders_counter}
          setCurrentPage={setCurrentPage}
          newOrder={newOrder}
          />
</Badge>
            </div>
            {width>550?
             <div className='icon-warper'>
              
             <Responsive_menu
             setCurrentPage={setCurrentPage}
             setTokenID={setTokenID}
             setToken={setToken}
             />
            </div>
            :<div style={{display:"none"}}></div>}
           
           
             </Grid>
        </Grid>
        {width>=750?
        
        <Grid style={{paddingBottom:'10px',paddingRight:"15px"}}>
            <h3 style={{color:'white'}} >
              {currentPage}
            </h3>
       </Grid> 
       :<div style={{display:"none"}}></div>}
       {width<550?
        <div className='icon-warper'>
        <Responsive_menu
        setTokenID={setTokenID}
        setToken={setToken}
        setCurrentPage={setCurrentPage}
        />
       </div>
       :<div style={{display:"none"}}></div>}
  
        </div>
    )
}
