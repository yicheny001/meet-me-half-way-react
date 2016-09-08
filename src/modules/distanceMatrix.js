const DistanceMatrix = (addresses, destination, travelMode, callback) => {
  var origins = addresses.map(address => new google.maps.LatLng(address.lat, address.lng))
  var destinations = [new google.maps.LatLng(destination.lat, destination.lng)]
  var service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix(
  {
    origins,
    destinations,
    travelMode
  }, callback)

}

export default DistanceMatrix
