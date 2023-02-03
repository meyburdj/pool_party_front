// import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesList from "./RoutesList";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import PoolPartyApi from "./api";
// import userContext from "./userContext";
import { TextField, Button, LinearProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import userContext from "./UserContext";

/**
 * App: it's an App! Parent component for entire ShareBNB application.
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("sharebnbToken"));
  const [toast, setToast] = useState({ open: false, msg: null });
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState();

  /**
   * effect triggered on change of token state. Checks localStorage for token.
   * If token exists then setToken, triggering other useEffect
   */
  useEffect(
    function getUserData() {
      async function fetchUserDataFromApi() {
        console.log("UseEffect token: ", token);
        PoolPartyApi.token = token;
        // PoolPartyApi.token = token;
        const { username } = jwt_decode(token);
        console.log(
          "🚀 ~ file: App.js:32 ~ fetchUserDataFromApi ~ username",
          username
        );

        try {
          console.log("starting try block");
          const { email, location } = await PoolPartyApi.fetchUserData(
            username
          );

          const newUser = { username, email, location };

          setUser(newUser);
          console.log("made it to end of try");
        } catch (err) {
          console.log("got an error: ", err);
          setToast({ open: true, msg: err[0] });
        } finally {
          console.log("finally statement");
          setIsLoading(false);
        }
      }
      if (token) {
        fetchUserDataFromApi();
        localStorage.setItem("sharebnbToken", token);
        console.log("setting token for local storage to: ", token);
        console.log(
          "localStorage token",
          localStorage.getItem("sharebnbToken")
        );
      } else {
        console.log("setting loading to false");
        setIsLoading(false);
      }
    },
    [token]
  );

  /**
   * login function makes api call to "/auth/token" to retrieve token. If call
   * is successful calls getUserAndJobs. If not successful, return false so that
   * page doesn't redirect.
   */
  async function login(data) {
    const newToken = await PoolPartyApi.loginUser(data);
    setToken(newToken);
    console.log("token", token);
  }

  /**
   * signup function makes api call to "/auth/register" to retrieve token. If
   * call is successful calls getUserAndJobs. If not successful, return false
   * so that page doesn't redirect.
   */
  async function signup(data) {
    const newToken = await PoolPartyApi.signupUser(data);
    setToken(newToken);
  }

  /**
   * updateProfile function makes api call to "/users/:username".
   */
  async function updateProfile(data) {
    const { username, email, location } = await PoolPartyApi.updateUser(data);

    setUser((curr) => ({
      username,
      email,
      location,
    }));
  }

  /**
   * function that sets user to null, removes PoolPartyApi token, effectively
   * logging them out from the application
   */
  function logout() {
    PoolPartyApi.token = "";
    setUser(null);
    setToken(null);
    localStorage.removeItem("sharebnbToken");
  }

  useEffect(function getPools() {
    search();
  }, []);

  /** Search function  */
  async function search(nameLike) {
    if (nameLike !== undefined) {
      nameLike = nameLike.trim();
    }
    if (nameLike === "") {
      nameLike = undefined;
    }
    const pools = await PoolPartyApi.getPools(nameLike);
    setPools(pools);
  }

  if (isLoading) return <p><LinearProgress /></p>;

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ user: user }}>
          <Navigation logout={logout} />
          <div className="Background">
            <RoutesList signup={signup} login={login} />
          </div>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
