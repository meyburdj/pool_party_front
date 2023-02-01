// import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
// import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState, useEffect } from "react";
import SharebnbApi from './api';
import { TextField, Button, LinearProgress } from "@mui/material";


/**
 * App: it's an App! Parent component for entire ShareBNB application.
 */
function App() {

  /** 
     * signup function makes api call to "/auth/register" to retrieve token. If 
     * call is successful calls getUserAndJobs. If not successful, return false 
     * so that page doesn't redirect. 
     */
  async function signup(data) {
    // const newToken = await JoblyApi.signupUser(data);
    // setToken(newToken);
    const resp = await SharebnbApi.signupUser(data);
    console.log(resp);
  }
  return (
    <div>
      <BrowserRouter>
        <RoutesList signup={signup} />
      </BrowserRouter>
    </div>
  );
}

export default App;
