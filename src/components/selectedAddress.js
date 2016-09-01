import React from 'react'

const SelectedAddress = ({address, remove}) => {
  return (
    <div>
      <p>{address}</p>
      <button onClick={remove}>Delete this place</button>
    </div>
  )
}

export default SelectedAddress
