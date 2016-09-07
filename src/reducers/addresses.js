export default function addresses(state = [], action) {
  switch(action.type) {
    case 'ADD_ADDRESS':
      if (state.find(function(obj){ return obj.name === action.payload.name })==undefined) {
        return state.concat(action.payload)
      }
      else {
        return state
      }
    case 'REMOVE_ADDRESS':
      var newState = [].concat(state)
      var addressToRemove = newState.find(address => address.name === action.payload)
      newState.splice(newState.indexOf(addressToRemove), 1)
      return newState
    default:
      return state
  }
}
