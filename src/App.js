import React,{useState,useEffect} from 'react'
import './App.css';
import Main from  './components/Main'
import Login from './login/Login';

function App() {
  const[token,setToken]=useState()
  const[tokenID,setTokenID]=useState()



useEffect(() => {
  const obj = JSON.parse(localStorage.getItem('cookies'))
  if(obj){
    setToken(obj.id)
    setTokenID(obj.token)
  }
}, [])


  return (
    <div className="App">
      {token && tokenID?
      <Main
      setToken={setToken}
     token={token}
     setTokenID={setTokenID}
     tokenID={tokenID}
     /> 
    :<Login
    setToken={setToken}
    token={token}
    setTokenID={setTokenID}
    tokenID={tokenID}
    />}
    </div>
  );
}

export default App;
