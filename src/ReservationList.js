// import React, { useState, useContext, useEffect } from "react";
// import PoolPartyApi from "./api";
// import userContext from "./UserContext";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import PoolCard from "./PoolCard";
// import PoolCardList from "./PoolCardList";
// import { LinearProgress } from "@mui/material";


// /**
//  * ReservationList: Parent component for reservations
//  *
//  * Props: reservations
//  * addReservation
//  * removeReservation
//  * addReservation={addReservation} removeReservation={removeReservation} />}
//  *
//  *  ReservationList -> PoolCardList -> [PoolCard, PoolCard, ...]
//  *
//  */
// function ReservationList({ reservations, addReservation, removeReservation }) {
//     const { user } = useContext(userContext);
//     // const [reservedPools, setReservedPools] = useState({
//     //     data: null,
//     //     isLoading: true
//     // });

//     // useEffect(function getPoolsOnMount() {
//     //     getAllReservations();
//     // }, []);

//     // async function getAllReservations() {
//     //     try {
//     //         const response = await PoolPartyApi.getReservationsByUsername(user.username);

//     //         const poolPromises = response.map((reservation) => PoolPartyApi.getPoolById(reservation.pool_id));
//     //         const pools = await Promise.all(poolPromises);

//     //         setReservedPools({
//     //             data: pools,
//     //             isLoading: false,
//     //         });
//     //     } catch (error) {
//     //         console.error("Error fetching reservations and pools:", error);
//     //     }
//     // }


//     // if (reservedPools.isLoading) return <p><LinearProgress /></p>;
//     console.log("user.reservations", user.reservations);

//     return (
//         <div>
//             {(!user.reservations || user.reservations.length === 0) ?
//                 <h2>
//                     No reservations currently
//                 </h2> :
//                 <h2>
//                     Check out your parties!
//                 </h2>}
//             <PoolCardList pools={user.reservations}></PoolCardList>
//         </div>
//     );
// }

// export default ReservationList;





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
 * addReservation
 * removeReservation
 * addReservation={addReservation} removeReservation={removeReservation} />}
 *
 *  ReservationList -> PoolCardList -> [PoolCard, PoolCard, ...]
 *
 */
function ReservationList({ reservations, addReservation, removeReservation }) {
    const { user } = useContext(userContext);
    const [reservedPools, setReservedPools] = useState({
        data: null,
        isLoading: true
    });


    useEffect(function getPoolsOnMount() {
        getAllReservations();
    }, [user]);

    async function getAllReservations() {
        try {
            // const response = await PoolPartyApi.getReservationsByUsername(user.username);

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

