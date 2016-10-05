export function addAddress(address) {
  return {
    type: 'ADD_ADDRESS',
    payload: address
  }
}

export function removeAddress(address) {
  return {
    type: 'REMOVE_ADDRESS',
    payload: address
  }
}

export function nuke() {
  return {
    type: 'NUKE'
  }
}
