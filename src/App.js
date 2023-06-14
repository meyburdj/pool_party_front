// import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesList from "./RoutesList";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import PoolPartyApi from "./api";
import { LinearProgress } from "@mui/material";
import jwt_decode from "jwt-decode";
import userContext from "./UserContext";

/**
 * App: Primary app level logic for Pool Party application
 * 
 * Props: NA
 * 
 * State:
 * -user: user information based off of the jwt and login credentials. Contains
 *  reservations and is passed into userContext provider
 * -token: JWT with username payload and signature from backend
 * 
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("sharebnbToken"));
  const [isLoading, setIsLoading] = useState(true);

  /**
   * effect triggered on change of token state. Checks localStorage for token.
   * If token exists then setToken, triggering other useEffect
   */
  useEffect(
    function getUserData() {
      async function fetchUserDataFromApi() {
        console.log("UseEffect token: ", token);
        PoolPartyApi.token = token;
        const { username } = jwt_decode(token);
        console.log(
          "🚀 ~ file: App.js:32 ~ fetchUserDataFromApi ~ username",
          username
        );

        try {
          const { email, location } = await PoolPartyApi.fetchUserData(
            username
          );
          const reservations = await PoolPartyApi.getReservationsByUsername(username);
          const reservationIds = reservations.map(reservation => reservation.pool_id);
          const newUser = { username, email, location, reservations, reservationIds };

          setUser(newUser);
        } catch (err) {

          console.log("error: ", err);
        } finally {
          setIsLoading(false);
        }
      }
      if (token) {
        fetchUserDataFromApi();
        localStorage.setItem("sharebnbToken", token);
      } else {
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

  // /**
  //  * updateProfile function makes api call to "/users/:username".
  //  */
  // async function updateProfile(data) {
  //   const { username, email, location } = await PoolPartyApi.updateUser(data);

  //   setUser((curr) => ({
  //     username,
  //     email,
  //     location,
  //   }));
  // }

  /**creates a reservation. drilled down to PoolCard */
  async function addReservation(pool) {
    const response = await PoolPartyApi.createReservation({
      pool_id: pool.id,
      start_date: null,
      end_date: null,
    });
    console.log("response", response);
    setUser({
      username: user.username,
      email: user.email,
      location: user.location,
      reservations: [...user.reservations, response.reservation],
      reservationIds: [...user.reservationIds, response.reservation.pool_id]
    });
  }

  /**Removes a reservation. drilled down to PoolCard */
  async function removeReservation(reservationId, poolId) {
    await PoolPartyApi.deleteBookedReservation(reservationId);
    setUser({
      username: user.username,
      email: user.email,
      location: user.location,
      reservations: user.reservations.filter(res => res.id !== reservationId),
      reservationIds: user.reservationIds.filter(pool => pool !== poolId),
    });
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

  // useEffect(function getPools() {
  //   search();
  // }, []);

  // /** Search function  */
  // async function search(nameLike) {
  //   if (nameLike !== undefined) {
  //     nameLike = nameLike.trim();
  //   }
  //   if (nameLike === "") {
  //     nameLike = undefined;
  //   }
  //   const pools = await PoolPartyApi.getPools(nameLike);
  //   setPools(pools);
  // }



  if (isLoading) return <p><LinearProgress /></p>;

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ user: user }}>
          <Navigation logout={logout} />
          <div className="Background">
            <RoutesList signup={signup} login={login}
              addReservation={addReservation} removeReservation={removeReservation} />
          </div>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
