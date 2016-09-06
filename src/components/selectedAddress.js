import React from 'react'

const SelectedAddress = ({address, remove}) => {
  return (
    <div>
      <label>{address.name}</label>
      <button onClick={remove}>Remove</button>
    </div>
  )
}

export default SelectedAddress
