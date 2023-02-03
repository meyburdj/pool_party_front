import React from 'react'
import PoolCard from './PoolCard'


/** PoolCardList: Renders list of Pool cards
 *
 * Props:
 * - pools: list of pool objects
 *
 *  PoolList -> PoolCardList -> [PoolCard,PoolCard,...]
 */
function PoolCardList({pools}) {

  const poolList = pools.map(pool => (
    <PoolCard key={pool.id} pool={pool}/>
  ))

  return (
    <div>
      {poolList}
    </div>
  )
}

export default PoolCardList