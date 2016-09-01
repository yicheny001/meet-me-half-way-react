export default function addressReducer(state = [], action){
  switch(action.type){
    case 'ADD_ADDRESS':
      if (!state.includes(action.payload)) {
        return state.concat(action.payload)
      }
      else {
        return state
      }

    case 'DELETE_ADDRESS':
      var newState = [].concat(state)
      newState.splice(state.indexOf(action.payload), 1)
      return newState
    default:
      return state
  }
}
