import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { domain } from "../../../connection/Config";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  modal: {
    zIndex: 10,
    position: "absolute",
    marginTop: "-50px",
    marginLeft: "-100px",
    background: "white",
    border: "1px solid",
    borderRadius: "20px",
    boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
    width: "24rem",
    height: "8rem",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    flexDirection: "column",
    placeContent: 'space-around'
  },
}));

export default function OrderReady({
  el,
  token,
  setPreview_orders,
  setNewOrder,
  setLoader,
  newOrder,
  preview_orders,
}) {
  const classes = useStyles();
  const [showValidationModal, setShowValidationModal] = useState(false);

  const validateOrderReady = () => {
    setShowValidationModal(true);
  };

  const validationModal = (
    <div className={classes.modal}>
      <span style={{'fontWeight': 'bold'}}>האם אתם בטוחים שההזמנה נמסרה לשליח, עם כל המנות בתוכה?</span>
      <span style={{'margin-right': '1rem', 'fontSize': '1.5rem'}}>
      <Button
          className="disagree"
          onClick={() => {
            setShowValidationModal(false);
          }}
          variant="outlined"
          size="small"
        >
          שכחתי משהו
        </Button>
        <Button
          className="bt-ready"
          onClick={() => {
            readyOrder(el);
          }}
          variant="outlined"
          size="small"
        >
          בטוחים
        </Button>
        
      </span>
    </div>
  );

  const readyOrder = async (id) => {
    setLoader(true);
    await fetch(`${domain}/orders/ready`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id.id,
        token: token,
      }),
    });
    // const data = await res2.json()
    // if(data.status === "succes no error possibly changed"){
    let new_newOrder = newOrder.filter((el) => el.id !== id.id);
    setNewOrder(new_newOrder);
    setPreview_orders([...preview_orders, id]);
    // }
    setLoader(false);
  };

  return (
    <>
      {showValidationModal && validationModal}
      <Button
        className="bt-ready"
        onClick={() => {
          validateOrderReady();
        }}
        variant="outlined"
        size="small"
      >
        ההזמנה נמסרה
      </Button>
    </>
  );
}
