import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import "../../../css/orders.css";
import OrderReady from "./Order_ready";
import UserHistory from "./User_history";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "right",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: "25px",
    // background:"rgb(245, 237, 229)"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    width: "250px",
  },
});

export default function NewOrder({
  el,
  token,
  setPreview_orders,
  setNewOrder,
  setLoader,
  newOrder,
  preview_orders,
  showOrderReady,
}) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid>
          <div>
            <h3>
              {" "}
              <span className="order_number">{el.order_id}</span> :מספר הזמנה
            </h3>
          </div>
          <h3 className="time">
            {" "}
            לתאריך :{" "}
            {new Date(el.delivery).toLocaleString(undefined, {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}{" "}
          </h3>
          {el.update_time ? (
            el.update_time.map((item) => {
              return (
                <>
                  {item.id === token ? (
                    <h4 style={{ color: "rgb(104, 105, 105)" }}>
                      {" "}
                      <span style={{ fontSize: "18px" }} className="time">
                        {item.time}
                      </span>{" "}
                      :שעת סיום מעודכנת
                    </h4>
                  ) : (
                    <></>
                  )}
                </>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
        <Divider
          style={{ marginBottom: "5px", marginTop: "10px" }}
          variant="right"
        />

        <Typography className={classes.pos} color="textSecondary">
          {el.note ? (
            <span>
              הערות :{" "}
              <span style={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                {el.note}
              </span>
            </span>
          ) : (
            "אין הערות"
          )}
        </Typography>
        <Typography variant="body2" component="p">
          <Divider
            style={{ marginBottom: "5px", marginTop: "10px" }}
            variant="right"
          />
          {el.items.map((item) => {
            return (
              <Grid>
                <h3>
                  {item.amount} . {item.name}
                </h3>
                {item.selected ? (
                  item.selected.map((el) => {
                    return (
                      <Grid>
                        <p>{el}</p>
                      </Grid>
                    );
                  })
                ) : (
                  <></>
                )}
              </Grid>
            );
          })}
        </Typography>
        <Divider variant="right" />
      </CardContent>
      <div style={{ display: "flex", placeContent: "center" }}>
        <CardActions>
          <UserHistory token={token} user_id={el.user_id} order_id={el.id} />
        </CardActions>
        <CardActions>
          {showOrderReady && (
            <OrderReady
              el={el}
              token={token}
              setPreview_orders={setPreview_orders}
              setNewOrder={setNewOrder}
              setLoader={setLoader}
              newOrder={newOrder}
              preview_orders={preview_orders}
            />
          )}
        </CardActions>
      </div>
    </Card>
  );
}
