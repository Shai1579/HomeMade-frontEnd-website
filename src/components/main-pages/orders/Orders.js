import React from "react";
import { Grid, Container } from "@material-ui/core";
import OldOrders from "./Old_orders";
import NewOrder from "./NewOrder";
import OrdersPopup from "./Orders_popup";
import "../../../css/orders.css";

export default function Orders({
  setLoader,
  setNewOrder,
  newOrder,
  token,
  popupTriger,
  setPopupTriger,
  setId_order,
  id_order,
  preview_orders,
  setPreview_orders,
  setRefresh,
}) {
  const oldOrders = [...preview_orders];
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayOrders = [];
  const tomorrowOrders = [];
  const futureOrders = [];
  if (preview_orders && Array.isArray(preview_orders)) {
    preview_orders.sort((a, b) => +b.order_id - +a.order_id);
  }

  newOrder.forEach((order) => {
    const orderDate = new Date(order.delivery).setHours(0, 0, 0, 0);
    if (orderDate === today) {
      todayOrders.push(order);
    } else if (orderDate === tomorrow.setHours(0, 0, 0, 0)) {
      tomorrowOrders.push(order);
    } else if (orderDate < today){
      oldOrders.push(order);
    } else {
      futureOrders.push(order);
    }
  });

  oldOrders.sort((a, b) => +b.order_id - +a.order_id);
  const todayOrdersJSX = todayOrders.map((el) => {
    return (
      <Grid style={{ marginBottom: "15px" }} key={el.order_id + "new"}>
        <NewOrder
          showOrderReady={true}
          el={el}
          token={token}
          setNewOrder={setNewOrder}
          newOrder={newOrder}
          preview_orders={oldOrders}
          setPreview_orders={setPreview_orders}
          setLoader={setLoader}
        />
      </Grid>
    );
  });
  const tomorrowOrdersJsx = tomorrowOrders.map((el) => {
    return (
      <Grid style={{ marginBottom: "15px" }} key={el.order_id + "new"}>
        <NewOrder
          el={el}
          token={token}
          setNewOrder={setNewOrder}
          newOrder={newOrder}
          preview_orders={oldOrders}
          setPreview_orders={setPreview_orders}
          setLoader={setLoader}
        />
      </Grid>
    );
  });
  const futureOrdersJsx = futureOrders.map((el) => {
    return (
      <Grid style={{ marginBottom: "15px" }} key={el.order_id + "new"}>
        <NewOrder
          el={el}
          token={token}
          setNewOrder={setNewOrder}
          newOrder={newOrder}
          preview_orders={oldOrders}
          setPreview_orders={setPreview_orders}
          setLoader={setLoader}
        />
      </Grid>
    );
  });

  return (
    <Container style={{ minHeight: "85vh" }} className="page_orders_warper">
      {popupTriger.length < 0 ? (
        <OrdersPopup
          setRefresh={setRefresh}
          setId_order={setId_order}
          id_order={id_order}
          setPopupTriger={setPopupTriger}
          newOrder={newOrder}
          token={token}
          setLoader={setLoader}
          setNewOrder={setNewOrder}
        />
      ) : (
        <></>
      )}
      <Grid className="main_warper">
        <Grid xl={4} md={4} lg={4}>
          <Grid className="header_warper">
            <h3>הזמנות שבוצעו</h3>
          </Grid>
          <Grid style={{ height: "100vh", overflowY: "auto" }}>
            {oldOrders && oldOrders.length > 0 ? (
              oldOrders.map((el) => {
                return (
                  <Grid
                    className="page_orders_warper"
                    style={{ marginTop: "12px" }}
                    key={el.order_id}
                  >
                    <OldOrders el={el} />
                  </Grid>
                );
              })
            ) : (
              <h4>...אין הזמנות קודמות </h4>
            )}
          </Grid>
        </Grid>
        <Grid xl={8} md={8} lg={8}>
          <Grid className="header_warper">
            <h3>הזמנות חדשות</h3>
          </Grid>
          <Grid className="newOrder-warper">
            {newOrder.length > 0 ? (
              <>
                <h3>הזמנות להיום</h3>
                {todayOrders.length > 0 && todayOrdersJSX}
                <p style={{ borderBottom: "1px solid grey", width: "80%" }}></p>
                <h3>הזמנות למחר</h3>
                {tomorrowOrders.length > 0 && tomorrowOrdersJsx}
                <p style={{ borderBottom: "1px solid grey", width: "80%" }}></p>
                <h3>הזמנות עתידיות</h3>
                {futureOrders.length > 0 && futureOrdersJsx}
                <p style={{ borderBottom: "1px solid grey", width: "80%" }}></p>
              </>
            ) : (
              <h3>אין הזמנות חדשות כרגע</h3>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
