import GoogleMaps from '../modules/googleMaps'

export default function map(state = {map: {}, markers: []}, action) {
  var map = state.map
  var markers
  switch(action.type) {
    case 'ADD_MAP':
      return {map: action.payload, markers: state.markers}
    case 'ADD_ADDRESS':
      var newMarker = GoogleMaps.createAndSetMarker({address: action.payload, map})
      markers = [...state.markers, newMarker]
      GoogleMaps.createAndFitBounds({markers, map})
      return {map, markers}
    case 'ADD_VENDORS':
      var businesses = action.payload.data.businesses
      var newMarkers = businesses.map(vendor => GoogleMaps.createAndSetMarker({address: vendor, map, onClick: action.meta}))
      markers = [].concat(state.markers).concat(newMarkers)
      return {map, markers}
    case 'REMOVE_ADDRESS':
      var markerToRemove = state.markers.find(marker => marker.title === action.payload)
      markerToRemove.setMap(null)
      markers = [].concat(state.markers)
      markers.splice(markers.indexOf(markerToRemove), 1)
      GoogleMaps.createAndFitBounds({markers, map})
      return {map, markers}
    case 'REMOVE_VENDORS':
      var markersToRemove = state.markers.filter(marker => marker.icon)
      markers = [].concat(state.markers)
      if (markersToRemove) {
        markersToRemove.forEach(marker => marker.setMap(null))
        markersToRemove.forEach(marker => markers.splice(markers.indexOf(marker), 1))
      }
      GoogleMaps.createAndFitBounds({markers, map})
      return {map, markers}
    default:
      return state
  }
}
