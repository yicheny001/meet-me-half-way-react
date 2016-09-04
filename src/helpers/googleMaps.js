import React from 'react'

const GoogleMaps = (origins, destinations) => {

  var createOriginMarker = (address) => {
    var lat = parseFloat(address.lat)
    var lng = parseFloat(address.lng)
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      title: address.name,
      animation: google.maps.Animation.DROP
    })
    return marker
  }

  var markers = origins.map(createOriginMarker)

  if (destinations) {
    var destinationMarkers = destinations.map(createDestinationMarker)
    markers = markers.concat(destinationMarkers)
  }

  var createBounds = () => {
    var bounds = new google.maps.LatLngBounds()
    markers.forEach(marker => bounds.extend(marker.getPosition()))
    return bounds
  }

  var createMap = () => {
    document.getElementById('map').innerHTML = ""
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 10
    })
    return map
  }

  var createMapWithBounds = () => {
    var bounds = createBounds()
    var map = createMap()
    map.fitBounds(bounds)
    markers.forEach((marker) => marker.setMap(map))
  }

  var findCenter = () => {
    var bounds = new google.maps.LatLngBounds()
    markers.forEach(marker => bounds.extend(marker.getPosition()))
    return bounds.getCenter()
  }

  return {createMapWithBounds, findCenter}

}

export default GoogleMaps
