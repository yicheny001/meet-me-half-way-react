import GoogleMaps from '../modules/googleMaps'

export default function map(state = {map: {}, markers: [], routes: [], currentVendor: {}}, action) {
  var map = state.map
  var markers, routes
  var deleteRoutes = (state) => {
    if (state.currentVendor.name) state.routes.forEach(route => route[0].setMap(null))
  }
  var conditionalSetMap = ({displayedVendorNames, marker, map}) => {
    if (displayedVendorNames.includes(marker.title)) marker.setMap(map)
  }
  switch(action.type) {
    case 'ADD_MAP':
      return {...state, map: action.payload}
    case 'ADD_ADDRESS':
      var newMarker = GoogleMaps.createAndSetMarker({address: action.payload, map})
      markers = [...state.markers, newMarker]
      GoogleMaps.createAndFitBounds({markers, map})
      deleteRoutes(state)
      return {...state, markers, routes: [], currentVendor: {}}
    case 'ADD_MARKERS':
      var {allVendors, displayedVendors, onClick} = action.payload
      var newMarkers = allVendors.map(address => GoogleMaps.createMarker({address, onClick}))
      markers = [].concat(state.markers).concat(newMarkers)
      var displayedVendorNames = displayedVendors.map(vendor => vendor.name)
      markers.forEach(marker => {
        conditionalSetMap({displayedVendorNames, marker, map})
      })
      return {...state, markers, currentVendor: {}}
    case 'ADJUST_MARKERS':
      var displayedVendorNames = action.payload.map(vendor => vendor.name)
      state.markers.filter(marker => marker.icon).forEach(marker => {
        marker.setMap(null)
        conditionalSetMap({displayedVendorNames, marker, map})
      })
      if (state.currentVendor.name && !displayedVendorNames.includes(state.currentVendor.name)) {
        var currentVendor = {}
        state.routes.forEach(route => route[0].setMap(null))
        routes = []
      }
      var currentVendor = state.currentVendor
      routes = state.routes
      return {...state, currentVendor, routes}
    case 'REMOVE_ADDRESS':
      markers = [].concat(state.markers)
      var markerToRemove = markers.find(marker => marker.title === action.payload)
      markerToRemove.setMap(null)
      markers.splice(markers.indexOf(markerToRemove), 1)
      GoogleMaps.createAndFitBounds({markers, map})
      deleteRoutes(state)
      return {...state, markers, routes: [], currentVendor: {}}
    case 'REMOVE_VENDORS':
      markers = [].concat(state.markers)
      var markersToRemove = markers.filter(marker => marker.icon)
      if (markersToRemove) {
        markersToRemove.forEach(marker => marker.setMap(null))
        markersToRemove.forEach(marker => markers.splice(markers.indexOf(marker), 1))
      }
      deleteRoutes(state)
      GoogleMaps.createAndFitBounds({markers, map})
      return {...state, markers, routes: [], currentVendor: {}}
    case 'ADD_CURRENT_VENDOR':
    case 'CHANGE_TRAVEL_MODE':
      deleteRoutes(state)
      var { currentVendor, travelMode } = action
      if (state.currentVendor.name) state.markers.find(marker => marker.title === state.currentVendor.name).setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png")
      state.markers.find(marker => marker.title === currentVendor.name).setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png")
      var originNames = state.markers.filter(marker => !marker.icon).map(origin => origin.title)
      routes = originNames.map(origin => GoogleMaps.calculateAndDisplayRoute({origin, currentVendor, travelMode, map}))
      return {...state, routes, currentVendor}
      break
    default:
      return state
  }
}
