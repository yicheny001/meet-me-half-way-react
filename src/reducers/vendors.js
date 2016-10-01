export default function vendors(state = {allVendors: [], displayedVendors: [], openNow: 'off', limit: 3}, action) {
  var applyFilters = (vendors, openNow, limit) => {
    if (openNow === 'on') {
      vendors = vendors.filter(vendor => vendor.hours).filter(vendor => vendor.hours.isOpen === true)
    }
    return vendors.slice(0, limit)
  }
  var allVendors, displayedVendors, openNow, limit
  switch(action.type) {
    case 'ADD_VENDORS':
      allVendors = action.vendors
      allVendors.forEach(vendor => {
        vendor.lat = vendor.location.lat
        vendor.lng = vendor.location.lng
      })
      displayedVendors = applyFilters(allVendors, state.filters, state.limit)
      return {...state, allVendors, displayedVendors}
    case 'REMOVE_VENDORS':
      return {...state, allVendors: [], displayedVendors: []}
    case 'TOGGLE_OPEN_NOW': // try to abstract this block into a function because it can be reused
      openNow = action.payload
      displayedVendors = applyFilters(state.allVendors, openNow, state.limit)
      return {...state, displayedVendors, openNow}
     case 'CHANGE_LIMIT':
      limit = action.payload
      displayedVendors = applyFilters(state.allVendors, state.openNow, limit)
      return {...state, displayedVendors, limit}
    default:
      return state
  }
}
