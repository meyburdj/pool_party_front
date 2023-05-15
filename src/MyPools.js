import React, { useState, useEffect, useContext } from "react";
import userContext from "./UserContext";
import PoolPartyApi from "./api";
import { LinearProgress } from "@mui/material";
import PoolCardList from "./PoolCardList";
import AddPoolForm from "./AddPoolForm";

/**
 * MyPools: Component that displays pools uploaded by current user and form to add 
 *  new pools
 *
 * Props: NA
 * 
 * State: 
 * -formDataText: text entered into form fields
 * -selectedFile: file data added to formData
 *
 * Component tree:
 *  MyPools -> AddPoolForm
 */
function MyPools() {
  const { user } = useContext(userContext);
  const [pools, setPools] = useState({
    data: null,
    isLoading: true,
  });

  useEffect(function getUsersPools() {
    fetchUsersPoolsFromApi();
  });

  async function addPool(newPoolData) {
    setPools(() => ({ isLoading: true }));
    const newPool = await PoolPartyApi.createPool(newPoolData);
    setPools(() => [...pools.data, newPool]);
    setPools(() => ({ isLoading: false }));
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

  if (pools.isLoading) return <p><LinearProgress /></p>;

  return (
    <div>
      <AddPoolForm addPool={addPool} />
      <div>
        <h2>Your Pools</h2>
      </div>
      {pools.data?.length >= 0 && <PoolCardList pools={pools.data} />}
    </div>
  );
}

export default MyPools;
