import Avg from '../modules/avg'

export default function vendors(state = {allVendors: [], displayedVendors: [], openNow: false, limit: 3, radius: {distance: null, factor: 1}, price: 4, type: null}, action) {
  var applyFilters = (vendors, openNow, limit, radius, price) => {
    if (openNow === true) {
      vendors = vendors.filter(vendor => vendor.hours).filter(vendor => vendor.hours.isOpen === true)
    }
    vendors = vendors.filter(vendor => vendor.location.distance < (radius.distance * radius.factor))
    vendors = vendors.filter(vendor => vendor.price.tier <= price)
    return vendors.slice(0, limit)
  }
  var allVendors, displayedVendors, openNow, limit, radius, price
  switch(action.type) {
    case 'ADD_VENDORS':
      allVendors = action.payload
      var arrayOfDistances = allVendors.map(vendor => {
        vendor.lat = vendor.location.lat
        vendor.lng = vendor.location.lng
        return vendor.location.distance
      })
      radius = {distance: Avg(arrayOfDistances), factor: state.radius.factor}
      displayedVendors = applyFilters(allVendors, state.openNow, state.limit, radius, state.price)
      return {...state, allVendors, displayedVendors, radius, type: 'add'}
    case 'REMOVE_VENDORS':
    case 'NUKE':
      return {...state, allVendors: [], displayedVendors: [], type: null}
      break
    case 'TOGGLE_OPEN_NOW': // try to abstract this block into a function because it can be reused
      openNow = action.payload
      displayedVendors = applyFilters(state.allVendors, openNow, state.limit, state.radius, state.price)
      return {...state, displayedVendors, openNow, type: 'adjust'}
    case 'CHANGE_LIMIT':
      limit = action.payload
      displayedVendors = applyFilters(state.allVendors, state.openNow, limit, state.radius, state.price)
      return {...state, displayedVendors, limit, type: 'adjust'}
    case 'CHANGE_RADIUS':
      radius = {distance: state.radius.distance, factor: action.payload}
      displayedVendors = applyFilters(state.allVendors, state.openNow, state.limit, radius, state.price)
      return {...state, displayedVendors, radius, type: 'adjust'}
    case 'CHANGE_PRICE':
      price = action.payload
      displayedVendors = applyFilters(state.allVendors, state.openNow, state.limit, state.radius, price)
      return {...state, displayedVendors, price, type: 'adjust'}
    default:
      return state
  }
}
