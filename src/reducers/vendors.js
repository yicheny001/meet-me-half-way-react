export default function vendors(state = {allVendors: [], displayedVendors: [], filters: []}, action) {
  var applyFilters = (vendors, filters) => {
    if (filters.includes('OPEN_NOW')) {
      vendors = vendors.filter(vendor => vendor.hours.isOpen === true)
    }
    return vendors
  }
  var allVendors, displayedVendors, filters
  switch(action.type) {
    case 'ADD_VENDORS':
      allVendors = action.vendors
      allVendors.forEach(vendor => {
        vendor.lat = vendor.location.lat
        vendor.lng = vendor.location.lng
      })
      displayedVendors = applyFilters(allVendors, state.filters)
      return {...state, allVendors, displayedVendors}
    case 'REMOVE_VENDORS':
      return {...state, allVendors: [], displayedVendors: []}
    case 'ADD_FILTER':
      filters = [...state.filters, action.payload]
      displayedVendors = applyFilters(state.allVendors, filters)
      return {...state, displayedVendors, filters}
    case 'REMOVE_FILTER':
      filters = [].concat(state.filters)
      filters.splice(filters.indexOf(action.payload), 1)
      displayedVendors = applyFilters(state.allVendors, filters)
      return {...state, displayedVendors, filters}
    default:
      return state
  }
}
