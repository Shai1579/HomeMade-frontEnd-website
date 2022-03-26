import React from 'react'
import { withStyles,Menu,MenuItem,ListItemIcon} from '@material-ui/core/';
import SendIcon from '@material-ui/icons/Send';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useHistory } from "react-router-dom";

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default function MenuNotifaication({setOrders_counter,setCurrentPage,orders_counter}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      
    };
   
    const handleClose = () => {
      setAnchorEl(null);
      setOrders_counter(0)
    };

    const orders= ()=>{
        setCurrentPage("הזמנות")
        history.push("/orders");

    }
    return (
        <>
    <NotificationsNoneIcon
       aria-controls="customized-menu"
       aria-haspopup="true"
       variant="contained"
       color="white"
       onClick={handleClick}
       style={{width:"40px",height:'30px'}}
       className='notifaication'
    />
     <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
             {orders_counter == 0?
            <p style={{paddingRight:'5px',paddingLeft:'5px'}}>
אין הזמנות חדשות
            </p>
            :
            <StyledMenuItem onClick={orders}>
     
            <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <p style={{color:'white'}}>
          ! הזמנות חדשות 
          </p>
            </StyledMenuItem> }
      
      
      </StyledMenu>
     
    </>
    )
}
