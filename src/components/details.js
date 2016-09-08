import React from 'react'

const Details = ({address, length}) => {
  return <div>{length} from {address.name}</div>
}

export default Details
