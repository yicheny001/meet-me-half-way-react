export default function vendors(state = [], action) {
  switch(action.type) {
    case 'ADD_VENDORS':
      var vendors = action.vendors
      vendors.forEach(vendor => {
        vendor.lat = vendor.location.lat
        vendor.lng = vendor.location.lng
      })
      return vendors
    case 'REMOVE_VENDORS':
      return []
    default:
      return state
  }
}
