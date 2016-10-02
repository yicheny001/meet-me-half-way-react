export default function addresses(state = [], action) {
  switch(action.type) {
    case 'ADD_ADDRESS':
      return [...state, action.payload]
    case 'REMOVE_ADDRESS':
      var newState = [].concat(state)
      var addressToRemove = newState.find(address => address.name === action.payload)
      newState.splice(newState.indexOf(addressToRemove), 1)
      return newState
    default:
      return state
  }
}
