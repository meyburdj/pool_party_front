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
  // console.log("pools has been updated to:", pools);
  useEffect(function getUsersPools() {
    fetchUsersPoolsFromApi();
  }, []);

  async function addPool(newPoolData) {
    setPools(() => ({isLoading: true}));
    const newPool = await PoolPartyApi.createPool(newPoolData);
    setPools(() => [...pools.data, newPool]);
    setPools(() => ({isLoading: false}));
    fetchUsersPoolsFromApi();
  }

  async function fetchUsersPoolsFromApi() {
    try {
      const response = await PoolPartyApi.getPoolsByUsername(user.username);
      console.log("response inside fetchuserspoolsfromapo", response);
      setPools(() => ({
        data: response,
        isLoading: false,
      }));
      console.log("this is pools after being setPools", pools);
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
      <div>
        <h2>Your Pools</h2>
      </div>
      {pools.data?.length >= 0 && <PoolCardList pools={pools.data} />}
    </div>
  );
}

export default MyPools;
