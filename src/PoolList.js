import { useState, useEffect } from "react";
import PoolCardList from "./PoolCardList";
// import SearchForm from "./SearchForm";
import MultiSelectForm from "./MultiSelectForm";
import PoolPartyApi from "./api";
import { LinearProgress } from "@mui/material";

/** // TODO: What does this component do?
 *
 * Props:
 * -
 *
 *
 * State:
 * -
 *
 *  ComponentAbove -> ThisComponent -> ComponentBelow
 */


function PoolList() {

    const [allPools, setAllPools] = useState({
        data: null,
        isLoading: true,
    });

    const [pools, setPools] = useState({
        data: null,
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
        console.log("hi", allPools);
        console.log(allPools.data.filter(pool => pool.city === city));
        city === 'all' ?
            pools = allPools.data :
            pools = allPools.data.filter(pool => pool.city === city);
        setPools({
            data: pools
        });
    }

    const cities = ["all", "Los Angeles", "San Francisco", "New York"];
    if (allPools.isLoading) return <p><LinearProgress /></p>;

    return (
        <>
            <MultiSelectForm label="Cities" options={cities} select={getPoolsByCity} />
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <h2>Join Your Party</h2>
            </div>
            {!pools.data ?
                <PoolCardList pools={allPools.data} /> :
                <PoolCardList pools={pools.data} />
            }
        </>
    );
}

export default PoolList;