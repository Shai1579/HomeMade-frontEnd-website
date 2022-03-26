import React,{useState} from 'react'
import clsx from 'clsx';
import { makeStyles,Grid,IconButton } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  
export default function Responsive_menu({setCurrentPage,setTokenID,setToken}) {
  const[closeBt,setCloseBt]=useState(true)
    const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setCloseBt(true)
      return;
    }
    setCloseBt(false)
    setState({ ...state, [anchor]: open });
  };
  const logout= ()=>{
    setTokenID()
    setToken()
    localStorage.clear()
}
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{textAlign:'center'}} className='side_nav_warper'>
      <Grid>
          <IconButton onClick={logout} style={{color:'white',width:'50px',height:'50px'}}>
            <ExitToAppIcon style={{color:'white',width:'50px',height:'40px'}}/>
            התנתק
            </IconButton> 
       </Grid> 
            <Grid className='link_warper'>
            <NavLink exact
            activeClassName="navbar__link--active"
            className='nav_link' onClick={()=>setCurrentPage('הזמנות')}  to='/orders'>הזמנות </NavLink>
            </Grid>
                <Grid className='link_warper'>
                <NavLink exact
                 activeClassName="navbar__link--active" 
                 className='nav_link' onClick={()=>setCurrentPage('פרופיל')}  to='/profile'>פרופיל</NavLink>
                </Grid>
                <Grid className='link_warper'>
                <NavLink exact
             activeClassName="navbar__link--active" 
             onClick={()=>setCurrentPage('זמינות מנה')} className='nav_link' to='/meals_manage'>זמינות מנה</NavLink>
                </Grid>
                <Grid style={{zIndex:'-1000'}} className='logo_warper'>
                    <img style={{width:"100%"}} src='Homemade.png'/>
                </Grid>
               
      </List>
    </div>
  );
  return (
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className='menu-bt' onClick={toggleDrawer(anchor, true)}>
             <MenuIcon  style={{color:'white',width:'40px',height:'30px'}}/>
            </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
