export default function details(state = {currentVendor: {}, lengths: [], travelMode: 'DRIVING'}, action) {
  var newState
  switch(action.type) {
    case 'ADD_CURRENT_VENDOR':
      newState = Object.assign({}, state)
      newState.currentVendor = action.payload
      return newState
    case 'ADD_LENGTHS':
      newState = Object.assign({}, state)
      newState.lengths = action.payload
      return newState
    case 'CHANGE_TRAVEL_MODE':
      newState = Object.assign({}, state)
      newState.travelMode = action.payload
      return newState
    case 'REMOVE_DETAILS':
      newState = Object.assign({}, state)
      newState.currentVendor = {}
      newState.lengths = []
      return newState
    default:
      return state
  }
}
