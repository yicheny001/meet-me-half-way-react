import React from 'react'

const Details = ({address, distance, time}) => {
  return <div>{distance} / {time} away from {address.name}</div>
}

export default Details
