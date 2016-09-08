function addError(error){
  return {
    type: 'ADD_ERROR',
    payload: error
  }
}

export default addError
