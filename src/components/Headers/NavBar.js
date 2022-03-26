import React from 'react'
import '../../css/nav_bars.css'
import {Grid,Avatar,Badge} from '@material-ui/core';
import MenuNotifaication from './Menu_notifaication';

export default function NavBar({currentPage,orders_counter,setOrders_counter,setCurrentPage,cooker,newOrder}) {
    return (
        <div className='nav'>
          <Grid className='icons_profile_warper warper'>
              <Grid className='icons_profile_warper'>
                  <Grid style={{paddingTop:'3px',paddingLeft:'5px',paddingRight:"7px"}}>
                  <Avatar style={{width:"50px",height:'50px'}} src="Homemade.png"/>
                  </Grid>
                <Grid >
                <h5>
              {cooker.vendor}
              </h5>
              </Grid> 
              </Grid>
             <Grid className='icons-header-warper'>
          <div className='icon-warper'>
          <Badge badgeContent={orders_counter} color="secondary">
          <MenuNotifaication
          newOrder={newOrder}
          orders_counter={orders_counter}
          setOrders_counter={setOrders_counter}
          setCurrentPage={setCurrentPage}
          />
</Badge>
            </div>
             </Grid>
        </Grid>
        <Grid style={{paddingBottom:'10px',paddingRight:"150px"}}>
            <h3 style={{color:'white'}}>
              {currentPage}
            </h3>
       </Grid>  
      
        </div>
    )
}
