function deleteAddress(address){
  return {
    type: 'DELETE_ADDRESS',
    payload: address
  }
}

export default deleteAddress
