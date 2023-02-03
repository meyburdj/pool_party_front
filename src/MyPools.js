import React, { useState, useEffect, useContext } from "react";
import PoolList from "./PoolList";
import userContext from "./UserContext";
import PoolPartyApi from "./api";
import { LinearProgress } from "@mui/material";
import PoolCardList from "./PoolCardList";
import AddPoolForm from "./AddPoolForm";

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

  async function addPool(newPoolData) {
    console.log("we are in the addPool function in mypools");
    const newPool = await PoolPartyApi.createPool(newPoolData);
    console.log("we have hit the newPool", newPool);

    setPools([...pools, newPool]);
  }

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
      <AddPoolForm addPool={addPool} />
      {/* {pools.length === 0 && <h4>Add your pools!</h4>} */}
      {pools.length >= 0 && <PoolCardList pools={pools.data} />}
    </div>
  );
}

export default MyPools;
