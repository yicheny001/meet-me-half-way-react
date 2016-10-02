export default function details(state = {currentVendor: {}, lengths: [], travelMode: 'DRIVING'}, action) {
  var newState
  switch(action.type) {
    case 'ADD_CURRENT_VENDOR':
      return {...state, currentVendor: action.currentVendor}
    case 'ADD_LENGTHS':
      return {...state, lengths: action.payload}
    case 'CHANGE_TRAVEL_MODE':
      return {...state, travelMode: action.travelMode}
    case 'REMOVE_DETAILS':
      return {...state, currentVendor: {}, lengths: []}
    default:
      return state
  }
}
