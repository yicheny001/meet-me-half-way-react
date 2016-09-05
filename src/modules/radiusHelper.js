import React from 'react'

const radiusHelper = (addresses, center) => {
  var origins = addresses.map(address => new google.maps.LatLng(address.lat, address.lng))
  var destinations = [new google.maps.LatLng(center.lat, center.lng)]
  return {origins, destinations}
}

export default radiusHelper
