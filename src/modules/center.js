import React from 'react'

const Center = (addresses) => {

  var convertToRadians = (address) => {
    var lat = address.lat/(180/Math.PI)
    var lng = address.lng/(180/Math.PI)
    return {lat, lng}
  }

  var convertToXYZ = (coordinate) => {
    var x = Math.cos(coordinate.lat)*Math.cos(coordinate.lng)
    var y = Math.cos(coordinate.lat)*Math.sin(coordinate.lng)
    var z = Math.sin(coordinate.lat)
    return {x, y, z}
  }

  var findAvg = (array) => {
    var sum = 0
    for (var i = 0; i < array.length; i++) {
        sum += array[i]
    }
    return sum/array.length;
  }

  var findAvgOfLetter = (array, letter) => {
    var arrayOfLetter = array.map(coordinate => coordinate[letter])
    return findAvg(arrayOfLetter)
  }

  var findAvgXYZ = (array) => {
    var [x, y, z] = ['x', 'y', 'z'].map((letter) => findAvgOfLetter(array, letter))
    return {x, y, z}
  }

  var convertToLatLng = (coordinate) => {
    var lng = Math.atan2(coordinate.y, coordinate.x)
    var hyp = Math.sqrt(coordinate.x**2 + coordinate.y**2)
    var lat = Math.atan2(coordinate.z, hyp)
    return {lat, lng}
  }

  var convertToDegrees = (coordinate) => {
    var lat = coordinate.lat*(180/Math.PI)
    var lng = coordinate.lng*(180/Math.PI)
    return {lat, lng}
  }

  var get = () => {
    var arrayOfRadians = addresses.map(convertToRadians)
    var arrayOfXYZ = arrayOfRadians.map(convertToXYZ)
    var avgXYZ = findAvgXYZ(arrayOfXYZ)
    var latLng = convertToLatLng(avgXYZ)
    return convertToDegrees(latLng)
  }

  return { get }

}

export default Center
