import GoogleMaps from '../modules/googleMaps'

export default function map(state = {map: {}, markers: [], routes: []}, action) {
  var map = state.map
  var routes = state.routes
  var markers
  switch(action.type) {
    case 'ADD_MAP':
      return {map: action.payload, markers: state.markers, routes}
    case 'ADD_ADDRESS':
      var newMarker = GoogleMaps.createAndSetMarker({address: action.payload, map})
      markers = [...state.markers, newMarker]
      GoogleMaps.createAndFitBounds({markers, map})
      return {map, markers, routes}
    case 'ADD_VENDORS':
      var vendors = action.vendors
      var newMarkers = vendors.map(vendor => GoogleMaps.createAndSetMarker({address: vendor, map, onClick: action.handleClick}))
      markers = [].concat(state.markers).concat(newMarkers)
      return {map, markers, routes}
    case 'REMOVE_ADDRESS':
      var markerToRemove = state.markers.find(marker => marker.title === action.payload)
      markerToRemove.setMap(null)
      markers = [].concat(state.markers)
      markers.splice(markers.indexOf(markerToRemove), 1)
      GoogleMaps.createAndFitBounds({markers, map})
      return {map, markers, routes}
    case 'REMOVE_VENDORS':
      var markersToRemove = state.markers.filter(marker => marker.icon)
      markers = [].concat(state.markers)
      if (markersToRemove) {
        markersToRemove.forEach(marker => marker.setMap(null))
        markersToRemove.forEach(marker => markers.splice(markers.indexOf(marker), 1))
      }
      GoogleMaps.createAndFitBounds({markers, map})
      return {map, markers, routes}
    case 'ADD_CURRENT_VENDOR':
      if (state.routes.length > 0) {
        state.routes.forEach(route => route[0].setMap(null))
      }
      var originNames = state.markers.filter(marker => !marker.icon).map(origin => origin.title)
      var destination = new google.maps.LatLng(action.payload.lat, action.payload.lng)
      var routes = originNames.map(origin => GoogleMaps.calculateAndDisplayRoute({origin, destination, map}))
      return {map, markers: state.markers, routes}
    default:
      return state
  }
}
