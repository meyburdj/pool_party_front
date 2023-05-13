import { useState, useEffect } from "react";
import PoolCardList from "./PoolCardList";
import PoolPartyApi from "./api";
import { LinearProgress } from "@mui/material";
import MultiSelectForm from "./MultiSelectForm";

//  * Props: addReservation, removeReservation
//  * -
//  *
//  *
//  * State: allPools, pools
//  * -
//  *
//  *  RouteList -> PoolList -> [MultiSelectForm, PoolCardList]
//  */


function PoolList({ addReservation, removeReservation }) {
    const [allPools, setAllPools] = useState({
        data: null,
        isLoading: true,
    });

    const [pools, setPools] = useState({
        data: null,
        city: "all",
    });

    useEffect(function getPoolsOnMount() {
        getAllPools();
    }, []);

    async function getAllPools() {
        const response = await PoolPartyApi.getPools();
        setAllPools({
            data: response,
            isLoading: false,
        });
    }

    function getPoolsByCity(city) {
        let pools;
        city === "all"
            ? (pools = allPools.data)
            : (pools = allPools.data.filter((pool) => pool.city === city));
        setPools({
            data: pools,
            city: city,
        });
    }

    const cities = ["all", "Los Angeles", "San Francisco", "New York"];
    if (allPools.isLoading) return <p><LinearProgress /></p>;

    return (
        <>
            <MultiSelectForm
                label="Cities"
                options={cities}
                select={getPoolsByCity}
                value={pools.city}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2>Join Your Party</h2>
            </div>
            {!pools.data ? (
                <PoolCardList pools={allPools.data}
                    addReservation={addReservation} removeReservation={removeReservation} />
            ) : (
                <PoolCardList pools={pools.data}
                    addReservation={addReservation} removeReservation={removeReservation} />
            )}
        </>
    );
}

export default PoolList;
