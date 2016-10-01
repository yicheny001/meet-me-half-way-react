function removeAddress(address) {
  return {
    type: 'REMOVE_ADDRESS',
    payload: address
  }
}

export default removeAddress
