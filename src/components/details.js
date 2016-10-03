import React from 'react'

const Details = ({address, length}) => {
  if (!length) {
    return <div>...loading</div>
  }
  else{
    return(
        <div>
          <div><b>{length} from</b></div>
          <div>{address.name.split(",")[0]}</div>
        </div>
    )
  }
}

export default Details
