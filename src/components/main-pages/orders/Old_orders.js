import React from 'react'
import { makeStyles,Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
   
  
export default function OldOrders({el}) {
    const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root}>
      <CardContent>
        
     
      <h3> <span className='order_number'>{el.order_id}</span> :מספר הזמנה</h3>
        <Typography variant="body2" component="p">
        {el.items.map(item=>{
                  return(
                      <Grid key={el.order_id + item.name}>
                          <h3>{item.amount} {item.name}  </h3>
                      </Grid>
                  )
              })
          }
        </Typography>
      </CardContent>
      <CardActions>
      <Typography variant="body2" component="p">
      {new Date(el.date).toLocaleString()}
        </Typography>
      </CardActions>
    </Card>
    )
}
