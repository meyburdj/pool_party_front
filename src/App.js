// import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
// import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState, useEffect } from "react";
import SharebnbApi from './api';
// import userContext from "./userContext";
import { TextField, Button, LinearProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";

/**
 * App: it's an App! Parent component for entire ShareBNB application.
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("sharebnbToken"));
  const [toast, setToast] = useState({ open: false, msg: null });
  const [isLoading, setIsLoading] = useState(true);

  /**
     * effect triggered on change of token state. Checks localStorage for token. 
     * If token exists then setToken, triggering other useEffect
     */
  useEffect(function getUserData() {
    async function fetchUserDataFromApi() {

      SharebnbApi.token = token;
      const { username } = jwt_decode(token);

      try {

        const { username, email, location } = (await
          SharebnbApi.fetchUserData(username));

        const newUser = { username, email, location };

        setUser(newUser);
      } catch (err) {

        setToast({ open: true, msg: err[0] });
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
      fetchUserDataFromApi();
      localStorage.setItem("sharebnbToken", token);
    }
    else {
      setIsLoading(false);
    }
  }, [token]);

  /** 
  * login function makes api call to "/auth/token" to retrieve token. If call 
  * is successful calls getUserAndJobs. If not successful, return false so that
  * page doesn't redirect.
  */
  async function login(data) {
    const newToken = await SharebnbApi.loginUser(data);
    setToken(newToken);
  }


  /** 
    * signup function makes api call to "/auth/register" to retrieve token. If 
    * call is successful calls getUserAndJobs. If not successful, return false 
    * so that page doesn't redirect. 
    */
  async function signup(data) {
    const newToken = await SharebnbApi.signupUser(data);
    setToken(newToken);
  }

  /** 
* updateProfile function makes api call to "/users/:username".
*/
  async function updateProfile(data) {
    const { username, email, location } = (await
      SharebnbApi.updateUser(data));

    setUser(curr => ({
      username,
      email,
      location,
    }));
  }

  /**
   * function that sets user to null, removes SharebnbApi token, effectively 
   * logging them out from the application
   */
  function logout() {
    SharebnbApi.token = "";
    setUser(null);
    setToken(null);
    localStorage.removeItem('sharebnbToken');
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
