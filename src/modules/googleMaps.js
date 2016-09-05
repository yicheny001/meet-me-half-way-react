import React from 'react'

const GoogleMaps = (origins, destinations) => {

  var createMarker = (address) => {
    var lat = parseFloat(address.lat)
    var lng = parseFloat(address.lng)
    var markerProto = {
      position: {lat: lat, lng: lng},
      title: address.name,
      animation: google.maps.Animation.DROP
    }
    if (address.id) {
      markerProto.icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
    var marker = new google.maps.Marker(markerProto)
    return marker
  }

  var markers = origins.map(createMarker)
  if (destinations) {
    var destinationMarkers = destinations.map(createMarker)
    markers = markers.concat(destinationMarkers)
  }
  var bounds = new google.maps.LatLngBounds()
  markers.forEach(marker => bounds.extend(marker.getPosition()))

  var createMap = () => {
    document.getElementById('map').innerHTML = ""
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 10
    })
    return map
  }

  var createMapWithBounds = () => {
    var map = createMap()
    map.fitBounds(bounds)
    markers.forEach((marker) => marker.setMap(map))
  }

  return {createMapWithBounds}

}

export default GoogleMaps
