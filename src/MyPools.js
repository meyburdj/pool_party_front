import React, { useState, useEffect, useContext } from "react";
import PoolList from "./PoolList";
import userContext from "./UserContext";
import PoolPartyApi from "./api";
import { LinearProgress } from "@mui/material";
import PoolCardList from "./PoolCardList";

function MyPools() {
  const { user } = useContext(userContext);
  const [pools, setPools] = useState({
    data: null,
    isLoading: true,
  });
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(function getUsersPools() {
    fetchUsersPoolsFromApi();
  }, []);

  async function fetchUsersPoolsFromApi() {
    try {
      const response = await PoolPartyApi.getPoolsByUsername(user.username);
      setPools({
        data: response,
        isLoading: false,
      });
    } catch (err) {
      console.log("got an error: ", err);
    }
  }

  if (pools.isLoading)
    return (
      <p>
        <LinearProgress />
      </p>
    );

  return (
    <div>
      {pools.length === 0 && <h4>Add your pools!</h4>}
      {pools.length >= 0 && <PoolCardList pools={pools.data} />}
    </div>
  );
}

export default MyPools;
