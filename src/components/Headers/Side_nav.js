import React from 'react'
import {Grid,IconButton} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function SideNav({setCurrentPage,setTokenID,setToken}) {
    const logout= ()=>{
        setTokenID()
        setToken()
        localStorage.clear()
    }
    return (
        <div className='side_nav_warper'>
             <Grid>
          <IconButton onClick={logout} style={{color:'white',width:'50px',height:'50px'}}>
            <ExitToAppIcon style={{color:'white',width:'40px',height:'30px'}}/>
            התנתק
            </IconButton> 
       </Grid> 
            <Grid className='link_warper'>
            <NavLink className='nav_link'    exact
            activeClassName="navbar__link--active"
             onClick={()=>setCurrentPage('הזמנות')}  to='orders'>הזמנות </NavLink>
            </Grid>
                <Grid className='link_warper'>
                <NavLink className='nav_link'    exact
                activeClassName="navbar__link--active"
                 onClick={()=>setCurrentPage('פרופיל')}  to='profile'>פרופיל</NavLink>
                </Grid>
                <Grid className='link_warper'>
                <NavLink onClick={()=>setCurrentPage('זמינות מנה')}    exact
                 activeClassName="navbar__link--active"
                 className='nav_link' to='/meals_manage'>זמינות מנה</NavLink>
                   
                </Grid>
              
                <Grid   className='logo_warper'>
                    <img style={{width:"100%",height:'70%'}} src='Homemade.png'/>
                </Grid>
        </div>
    )
}
