import React, { useState, useContext, useEffect } from "react";
import PoolPartyApi from "./api";
import userContext from "./UserContext";
import PoolCardList from "./PoolCardList";
import { LinearProgress } from "@mui/material";


/**
 * ReservationList: Parent component for reservations
 *
 * Props: 
 * -addReservation: Function propdrilled from App that adds a reservation to db
 *   and updates user state
 * -removeReservation: Function propdrilled from App that removes a reservation 
 *   from db and updates user state 
 *
 * State:
 *  -reservedPools: holds pools that are reserved for current user and loading state
 * 
 * Component tree:
 *  ReservationList -> PoolCardList -> [PoolCard, PoolCard, ...]
 *
 */
function ReservationList({ addReservation, removeReservation }) {
    const { user } = useContext(userContext);
    const [reservedPools, setReservedPools] = useState({
        data: null,
        isLoading: true
    });


    useEffect(function getPoolsOnMount() {
        getAllReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getAllReservations() {
        try {

            const poolPromises = user.reservations.map((reservation) => PoolPartyApi.getPoolById(reservation.pool_id));
            const pools = await Promise.all(poolPromises);

            setReservedPools({
                data: pools,
                isLoading: false,
            });
        } catch (error) {
            console.error("Error fetching reservations and pools:", error);
        }
    }

    console.log("reservedPools.data", reservedPools.data);
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
            <PoolCardList pools={reservedPools.data}
                addReservation={addReservation} removeReservation={removeReservation}></PoolCardList>
        </div>
    );
}

export default ReservationList;

