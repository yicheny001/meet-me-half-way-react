export default function vendors(state = [], action) {
  switch(action.type) {
    case 'ADD_VENDORS':
      action.payload.forEach(vendor => {
        vendor.lat = vendor.location.coordinate.latitude
        vendor.lng = vendor.location.coordinate.longitude
      })
      return action.payload
    default:
      return state
  }
}
