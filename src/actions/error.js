export function addError(error) {
  return {
    type: 'ADD_ERROR',
    payload: error
  }
}

export function removeError() {
  return {
    type: 'REMOVE_ERROR'
  }
}
