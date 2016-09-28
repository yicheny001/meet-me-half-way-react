import React from 'react'

const Details = ({address, length}) => {
  return <div>{length} from {address.name.split(",")[0]}</div>
}

export default Details
