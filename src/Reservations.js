import React, { useState, useContext, useEffect } from "react";
import PoolPartyApi from "./api";
import userContext from "./UserContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PoolCard from "./PoolCard";

/**
 * ReservationList: Parent component for reservations
 *
 * Props: reservations
 *
 * RouteList -> ReservationList -> [PoolCard, PoolCard, ...]
 *
 */
function ReservationList({ reservations }) {
  const { user } = useContext(userContext);
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      const res = await PoolPartyApi.getReservationsByUsername(user.username);
      const poolsWithReservations = await Promise.all(
        res.map(async (reservation) => {
          const pool = await PoolPartyApi.getPoolById(reservation.pool_id);
          return { ...reservation, pool };
        })
      );
      setReservationList(poolsWithReservations);
    }
    fetchReservations();
  }, [user.username]);

  if (!reservationList || reservationList.length === 0) {
    return <div>No reservations currently</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {reservationList.map((reservation) => (
          <Grid item xs={12} sm={6} md={4} key={reservation.id}>
            <PoolCard pool={reservation.pool} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ReservationList;
