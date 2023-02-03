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

    const [pools, setPools] = useState({
        data: null,
        isLoading: true,
    });

    useEffect(function getPoolsOnMount() {
        getPools();
    }, []);

    async function getPools() {
        const response = await PoolPartyApi.getPools();
        setPools({
            data: response,
            isLoading: false,
        });
    }

    async function getPoolsByCity(city) {
        const response = await PoolPartyApi.getPoolsByCity(city);
        setPools({
            data: response,
            isLoading: false,
        });
    }

    const cities = ["Los Angeles", "San Francisco", "New York", "Seattle"];
    if (pools.isLoading) return <p><LinearProgress /></p>;

    return (
        <>
            <MultiSelectForm label="Cities" options={cities} select={getPoolsByCity} />
            <PoolCardList pools={pools.data} />
        </>
    );
}

export default PoolList;