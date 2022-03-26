import React, { useState, useEffect } from "react";
import Financial_reports from "./main-pages/Financial/Financial_reports";
import Reviews from "./main-pages/reviews/Reviews";
import Profile from "./main-pages/Profile";
import Meals_manage from "./main-pages/meals_manage/Meals_manage";
import Orders from "./main-pages/orders/Orders";
import NavBar from "./Headers/NavBar";
import SideNav from "./Headers/Side_nav";
import { Grid } from "@material-ui/core";
import { domain } from "../connection/Config";
import Loading from "../components/Loading_spinner/Loading";
import Footer from "../components/Headers/Footer";
import ResponsiveNav from "./Headers/Responsive_nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../connection/firebase";
import Support from "./Headers/Support";
import "../css/main.css";
import Bug_support from "./support/Bug_support";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
// import { collection, query, where, onSnapshot } from "firebase";

export default function Main({ setToken, token, setTokenID, tokenID }) {
  //listen to screen size changes
  const [width, setWidth] = useState(window.innerWidth);
  const [popupTriger, setPopupTriger] = useState(false);
  const [id_order, setId_order] = useState(0);
  const [preview_orders, setPreview_orders] = useState([]);
  const [currentPage, setCurrentPage] = useState("הזמנות");
  const [cooker, setCooker] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [story, setStory] = useState("");
  const [orders_counter, setOrders_counter] = useState(0);
  const [loader, setLoader] = useState(false);
  const [newOrder, setNewOrder] = useState([]);
  const [cooker_working, setCooker_working] = useState([]);
  const [cash_withrawal, setCash_withrawal] = useState(0);
  const [refresh, setRefresh] = useState();
  const [ringtone, setRingtone] = useState("");
  const [automatic, setAutomatic] = useState(false);
  const [question, setQuestion] = useState("");

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });
  const db = firebase.firestore();

  useEffect(async () => {
    setLoader(true);
    db.collection("orders")
      .where("cooker_sent", "==", false)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            let date = doc.data().created_at.toDate();
            let x = doc.data().delivery_time;
            var theDate = new Date(x * 1000 - 600000);
            setId_order(doc.id);
            let item = {
              ...doc.data(),
              id: doc.id,
              date: date,
              delivery: theDate,
            };
            item.items = item.items.filter((el) => el.cooker_id == token);
            if (item.items.length > 0) {
            }
            for (let i = 0; i < item.items.length; i++) {
              if (item.items[i].cooker_id !== token) {
                item.items.splice(i, 1);
              }
            }
            if (item.items.length > 0) {
              let arr = newOrder;
              arr.unshift(item);
              setNewOrder(arr);
              setOrders_counter(orders_counter + 1);
              toast("הזמנה חדשה נכנסה!");
              setPopupTriger(true);
            }
          }
        });
      });

    //listening to changes in orders collection

    const cookers_details = async () => {
      //getting data of the cooker
      try {
        const res = await fetch(`${domain}/cookers-admin/${token}`);
        const data = await res.json();
        setCooker(data.cooker);
        setEmail(data.cooker.Email);
        setAddress(data.cooker.address);
        setPhone_number(data.cooker.phone_number);
        setCooker_working(data.cooker.working_hours);
        setStory(data.story);
        setQuestion(data.question);
        if (data.cooker.ringtone) {
          setRingtone(data.cooker.ringtone);
        } else {
          setRingtone(
            "https://res.cloudinary.com/df2pklfox/video/upload/v1627976717/demoImage/fwuhfq2ihqfy869kawuk.ogg"
          );
        }
        setCash_withrawal(data.cooker.cash_withrawal);
      } catch (err) {
        console.log(err);
      }
    };
    const orders_check = async () => {
      try {
        const res = await fetch(`${domain}/orders/${token}`);
        const data = await res.json();
        setPreview_orders(data.my_orders);
        if (data.orders_notReady.length) {
          toast("! הזמנות פתוחות");
          setOrders_counter(orders_counter + 1);
        }
        setNewOrder(data.orders_notReady);
        let arr_orders = [];
        for (let i = 0; i < data.orders_notReady.length; i++) {
          if (data.orders_notReady[i].approved) {
            if (!data.orders_notReady[i].approved.includes(token)) {
              arr_orders.push(data.orders_notReady[i]);
              setPopupTriger(arr_orders);
            }
          } else {
            arr_orders.push(data.orders_notReady[i]);
            setPopupTriger(arr_orders);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    orders_check();
    cookers_details();
    setLoader(false);
    sounds();
  }, [refresh]);
  const sounds = () => {
    if (newOrder.length > 0) {
      setAutomatic(true);
      setInterval(function () {
        toast("! הזמנות פתוחות");
      }, 300000);
      setAutomatic(false);
    } else {
      return;
    }
  };

  return (
    <HashRouter>
      <Grid>
        <Loading loader={loader} />

        <Grid className="headers-warper">
          <ToastContainer />
          <Grid xl={10} md={12} lg={10} className="header-nav">
            {width > 950 ? (
              <NavBar
                currentPage={currentPage}
                orders_counter={orders_counter}
                setOrders_counter={setOrders_counter}
                setCurrentPage={setCurrentPage}
                cooker={cooker}
                newOrder={newOrder}
              />
            ) : (
              <ResponsiveNav
                cooker={cooker}
                currentPage={currentPage}
                orders_counter={orders_counter}
                setOrders_counter={setOrders_counter}
                setCurrentPage={setCurrentPage}
                width={width}
                setTokenID={setTokenID}
                setToken={setToken}
                newOrder={newOrder}
              />
            )}
            <Grid className="page_warper">
              <Support />

              <Switch>
                <Route path="/reviews">
                  <Reviews setLoader={setLoader} token={token} />
                </Route>

                <Route path="/meals_manage">
                  <Meals_manage
                    setLoader={setLoader}
                    setToken={setToken}
                    token={token}
                    tokenID={tokenID}
                  />
                </Route>

                <Route path="/profile">
                  <Profile
                    cooker={cooker}
                    setCooker={setCooker}
                    email={email}
                    setEmail={setEmail}
                    address={address}
                    setAddress={setAddress}
                    phone_number={phone_number}
                    setPhone_number={setPhone_number}
                    setStory={setStory}
                    story={story}
                    setLoader={setLoader}
                    token={token}
                    setRingtone={setRingtone}
                    setCooker_working={setCooker_working}
                    cooker_working={cooker_working}
                  />
                </Route>

                <Route path="/orders">
                  <Orders
                    setToken={setToken}
                    token={token}
                    setLoader={setLoader}
                    setNewOrder={setNewOrder}
                    newOrder={newOrder}
                    setPopupTriger={setPopupTriger}
                    popupTriger={popupTriger}
                    setId_order={setId_order}
                    id_order={id_order}
                    setId_order={setId_order}
                    setPreview_orders={setPreview_orders}
                    preview_orders={preview_orders}
                    setRefresh={setRefresh}
                  />
                </Route>

                <Route path="/Support">
                  <Bug_support />
                </Route>

                <Route path="/">
                  <Orders
                    setToken={setToken}
                    token={token}
                    setLoader={setLoader}
                    setNewOrder={setNewOrder}
                    newOrder={newOrder}
                    setPopupTriger={setPopupTriger}
                    popupTriger={popupTriger}
                    setId_order={setId_order}
                    id_order={id_order}
                    setId_order={setId_order}
                    setPreview_orders={setPreview_orders}
                    preview_orders={preview_orders}
                    setRefresh={setRefresh}
                  />
                </Route>
              </Switch>
            </Grid>
            <Grid>
              <Footer />
            </Grid>
          </Grid>
          {width > 950 ? (
            <Grid xl={2} md={0} lg={2} className="side_bar">
              <SideNav
                setCurrentPage={setCurrentPage}
                setTokenID={setTokenID}
                setToken={setToken}
              />
            </Grid>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
        </Grid>
      </Grid>
      {orders_counter > 0 || automatic ? (
        <iframe
        title="mainiFrame"
          style={{ display: "none" }}
          src={ringtone}
          allow="autoplay"
          id="iframeAudio"
        ></iframe>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </HashRouter>
  );
}
