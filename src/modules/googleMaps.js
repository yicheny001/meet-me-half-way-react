import React from 'react'

const GoogleMaps = (origins, destinations, onClick) => {

  var createMarker = (address) => {
    var lat = parseFloat(address.lat)
    var lng = parseFloat(address.lng)
    var markerProto = {
      position: {lat: lat, lng: lng},
      title: address.name,
      animation: google.maps.Animation.DROP
    }
    if (address.id) { // if the address is a vendor, add an event listener and a green icon
      markerProto.icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      var marker = new google.maps.Marker(markerProto)
      marker.addListener('click', () => {
        onClick(address)
      })
    } else {
      var marker = new google.maps.Marker(markerProto)
    }
    return marker
  }

  var markers = origins.map(createMarker) // always make map markers for origins
  if (destinations) { // if there are existing vendors, make markers for those too
    var destinationMarkers = destinations.map(createMarker)
    markers = markers.concat(destinationMarkers) // combine all markers together in a single array
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
