import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { domain } from "../../../connection/Config";
import Rejected from "./Rejected";
import Divider from "@material-ui/core/Divider";
import Loading from "../../Loading_spinner/Loading";
import "../../../css/orders.css";
import firebase from "../../../connection/firebase";
import UserHistory from "./User_history";
export default function OrdersPopup({
  setPopupTriger,
  setRefresh,
  newOrder,
  token,
  setNewOrder,
  setLoader,
}) {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const db = firebase.firestore();
  useEffect(() => {
    setOpen(true);
  }, []);

  const delivery = async (index) => {
    setLoader(true);
    try {
      if (time !== "") {
        let obj = {
          time: time,
          id: token,
        };
        let snapshot = await db
          .collection("orders")
          .doc(newOrder[index].id)
          .get();

        let full_order = { ...snapshot.data(), id: snapshot.id };
        if (full_order.update_time) {
          full_order.update_time.push(obj);
          snapshot = await db
            .collection("orders")
            .doc(newOrder[index].id)
            .update({
              update_time: full_order.update_time,
            });
        } else {
          let arr = [obj];
          snapshot = await db.collection("orders").doc(newOrder[index].id);
          snapshot.set(
            {
              update_time: arr,
            },
            { merge: true }
          );
        }
      }
      const res2 = await fetch(`${domain}/orders/delivery`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: token,
          items: newOrder[index],
          user_id: newOrder[index].user_id,
        }),
      });
      const data = await res2.json();

      setTime("");
      setPopupTriger([]);
      const res = await fetch(`${domain}/orders/${token}`);
      const data2 = await res.json();
      setNewOrder(data2.orders_notReady);
      let arr_orders = [];
      for (let i = 0; i < data2.orders_notReady.length; i++) {
        if (data2.orders_notReady[i].approved) {
          if (!data2.orders_notReady[i].approved.includes(token)) {
            arr_orders.push(data2.orders_notReady[i]);
            setPopupTriger(arr_orders);
          }
        } else {
          arr_orders.push(data2.orders_notReady[i]);
          setPopupTriger(arr_orders);
        }
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleclose = () => {
    setRefresh(Math.random());
    setOpen(false);
    setPopupTriger([]);
  };

  return (
    <div>
      <Loading />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        {newOrder.map((el, index) => {
          return (
            <>
              {!el.approved ? (
                <form>
                  <DialogTitle id="responsive-dialog-title">
                    התקבלה הזמנה חדשה
                  </DialogTitle>

                  <DialogContent>
                    <div>
                      <h3>
                        {" "}
                        <span className="order_number">{el.order_id}</span>{" "}
                        :מספר הזמנה
                      </h3>
                    </div>
                    <DialogContentText>
                      {el.items.map((item) => {
                        return (
                          <h3>
                            .{item.name}. כמות: {item.amount}{" "}
                          </h3>
                        );
                      })}
                      <p>{el.note}</p>
                    </DialogContentText>
                    <Divider
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                      variant="right"
                    />
                    <DialogContentText style={{ fontSize: "18px" }}>
                      <h3>
                        <span className="time">
                          {new Date(el.delivery).toLocaleString("en-GB", {
                            hour: "numeric",
                            minute: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>{" "}
                        :למתי{" "}
                      </h3>
                    </DialogContentText>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserHistory
                        token={token}
                        user_id={el.user_id}
                        order_id={el.id}
                      />
                    </div>
                  </DialogContent>

                  <Grid className="bt-warper">
                    <Rejected
                      setRefresh={setRefresh}
                      newOrder={newOrder}
                      index={index}
                      token={token}
                    />
                    <Button
                      onClick={() => {
                        delivery(index);
                      }}
                      type="button"
                      className="agree"
                      variant="outlined"
                    >
                      אישור
                    </Button>
                  </Grid>
                </form>
              ) : !el.approved.includes(token) ? (
                <form>
                  <DialogTitle id="responsive-dialog-title">
                    התקבלה הזמנה חדשה
                  </DialogTitle>

                  <DialogContent>
                    <div></div>
                    <div>
                      <h3>
                        {" "}
                        <span className="order_number">{el.order_id}</span>{" "}
                        :מספר הזמנה
                      </h3>
                    </div>
                    <DialogContentText>
                      {el.items.map((item) => {
                        return (
                          <h3>
                            .{item.name}. כמות: {item.amount}{" "}
                          </h3>
                        );
                      })}
                      <p>{el.note}</p>
                    </DialogContentText>

                    <Divider
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                      variant="right"
                    />
                    <DialogContentText style={{ fontSize: "18px" }}>
                      <h3>
                        <span className="time">
                          {new Date(el.delivery).toLocaleString("en-GB", {
                            hour: "numeric",
                            minute: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>{" "}
                        :למתי{" "}
                      </h3>
                    </DialogContentText>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserHistory
                        token={token}
                        user_id={el.user_id}
                        order_id={el.id}
                      />
                    </div>
                  </DialogContent>
                  <Grid className="bt-warper">
                    <Rejected
                      setNewOrder={setNewOrder}
                      token={token}
                      newOrder={newOrder}
                      index={index}
                      setRefresh={setRefresh}
                    />
                    <Button
                      onClick={() => {
                        delivery(index);
                      }}
                      type="button"
                      className="agree"
                      variant="outlined"
                    >
                      אישור
                    </Button>
                  </Grid>
                </form>
              ) : (
                handleclose
              )}
            </>
          );
        })}
      </Dialog>
    </div>
  );
}
