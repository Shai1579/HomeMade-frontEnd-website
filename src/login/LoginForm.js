import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import firebase from "../connection/firebase";
// import firebase from "firebase/app";

import "react-toastify/dist/ReactToastify.css";
export default function LoginForm({ setToken, tokenID, setTokenID, token }) {
  const [email, setEmail] = useState("");
  // const[loading,setLoading]=useState(false)
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          // Signed in
          var user = userCredential.user;
          if (user) {
            const obj = {
              token: user.Aa,
              id: user.uid,
            };
            localStorage.setItem("cookies", JSON.stringify(obj));
            console.log(user);
            setToken(obj.id);
            setTokenID(obj.token);
          } else {
            alert("סיסמא לא נכונה");
          }
        })
        .catch((error) => {
          alert("סיסמא או אימייל לא נכונים");
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Grid className="input-warper">
        <h2> כניסה לאתר בשלנים</h2>
      </Grid>

      <ToastContainer className="Toast" />
      <Grid className="input-warper">
        <TextField
          className="textField_login"
          required
          label="אימייל:"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid className="input-warper">
        <TextField
          type="password"
          className="textField_login"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          label="סיסמא:"
        ></TextField>
      </Grid>

      <Grid className="input-warper">
        <Button onClick={login} className="Button" variant="outlined">
          התחבר
        </Button>
      </Grid>
    </Grid>
  );
}
