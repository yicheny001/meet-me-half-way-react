import React from 'react'

const SelectedAddresses = ({addresses, remove}) => {
  var addressesWithRemove = addresses.map(address => {
    return (
      <div>
        <label>{address.name}</label>
        <button onClick={remove}>Delete this place</button>
      </div>
    )
  })
  return <div>{addressesWithRemove}</div>
}

export default SelectedAddresses
