export default function vendors(state = [], action) {
  switch(action.type) {
    case 'ADD_VENDORS':
      var vendors = action.vendors
      vendors.forEach(vendor => {
        vendor.lat = vendor.location.coordinate.latitude
        vendor.lng = vendor.location.coordinate.longitude
      })
      return vendors
    case 'REMOVE_VENDORS':
      return []
    default:
      return state
  }
}
