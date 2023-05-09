import React, { useState, useContext, useEffect } from "react";
import PoolPartyApi from "./api";
import userContext from "./UserContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PoolCard from "./PoolCard";
import PoolCardList from "./PoolCardList";
import { LinearProgress } from "@mui/material";


/**
 * ReservationList: Parent component for reservations
 *
 * Props: reservations
 *
 *  ReservationList -> PoolCardList -> [PoolCard, PoolCard, ...]
 *
 */
function ReservationList({ reservations }) {
    const { user } = useContext(userContext);
    const [reservedPools, setReservedPools] = useState({
        data: null,
        isLoading: true
    });


    useEffect(function getPoolsOnMount() {
        getAllReservations();
    }, []);

    async function getAllReservations() {
        try {
            const response = await PoolPartyApi.getReservationsByUsername(user.username);

            const poolPromises = response.map((reservation) => PoolPartyApi.getPoolById(reservation.pool_id));
            const pools = await Promise.all(poolPromises);

            setReservedPools({
                data: pools,
                isLoading: false,
            });
        } catch (error) {
            console.error("Error fetching reservations and pools:", error);
        }
    }


    if (reservedPools.isLoading) return <p><LinearProgress /></p>;


    return (
        <div>
            {(!reservedPools.data || reservedPools.data.length === 0) ?
                <h2>
                    No reservations currently
                </h2> :
                <h2>
                    Check out your parties!
                </h2>}
            <PoolCardList pools={reservedPools.data}></PoolCardList>
        </div>
    );
}

export default ReservationList;
