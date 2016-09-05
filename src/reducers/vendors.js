export default function vendors(state = [], action) {
  switch(action.type) {
    case 'ADD_VENDORS':
      var businesses = action.payload.data.businesses
      businesses.forEach(vendor => {
        vendor.lat = vendor.location.coordinate.latitude
        vendor.lng = vendor.location.coordinate.longitude
      })
      return businesses
    case 'REMOVE_VENDORS':
      return []
    default:
      return state
  }
}
