import React from 'react';
import PoolCard from './PoolCard';
import { Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';


/** PoolCardList: Renders list of Pool cards
 *
 * Props:
 * - pools: list of pool objects
 * -addReservation
 * -removeReservation 
 * addReservation={addReservation} removeReservation={removeReservation}
 *
 *  PoolList -> PoolCardList -> [PoolCard,PoolCard,...]
 */
function PoolCardList({ pools, addReservation, removeReservation }) {

    const poolList = pools.map(pool => (
        <Grid2 key={`${pool.id}-grid`} xs={6} md={4}>
            <PoolCard key={pool.id} pool={pool}
                addReservation={addReservation} removeReservation={removeReservation} />
        </Grid2>
    ));

    return (
        <Grid2 container spacing={2} mt={2}>
            {poolList}
        </Grid2>
    );
}

export default PoolCardList;