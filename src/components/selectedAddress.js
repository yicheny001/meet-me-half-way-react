import React from 'react'

const SelectedAddress = ({address, remove}) => {
  return (
    <div>
      {address.name} &nbsp;
      <button onClick={remove}>Remove</button>
    </div>
  )
}

export default SelectedAddress
