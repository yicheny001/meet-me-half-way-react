import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addAddress from '../actions/addAddress'
import deleteAddress from '../actions/deleteAddress'
import SelectedAddress from './selectedAddress'


const Map = class extends Component {

  createDestinationsMap(addresses) {
   var markers = addresses.map(this.createMarker)
   this.createMapWithBounds(markers)
  }

  createMarker(address) {
   var lat = parseFloat(address.lat)
   var lng = parseFloat(address.lng)
   var marker = new google.maps.Marker({
     position: {lat: lat, lng: lng},
     title: address.name,
     animation: google.maps.Animation.DROP
   })
   return marker
  }

  createMapWithBounds(markers) {
   var bounds = this.createBounds(markers)
   var map = this.createMap()
   map.fitBounds(bounds)
   debugger
   markers.forEach((marker) => marker.setMap(map))
  }

  createBounds(markers) {
   var bounds = new google.maps.LatLngBounds();
   for (var i = 0; i < markers.length; i++) {
     bounds.extend(markers[i].getPosition());
   }
   return bounds
  }

  createMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 0, lng: 0},
     zoom: 10
   })
   return map
  }

render() {
    if (this.props.addresses.length !== 0) {
      this.createDestinationsMap(this.props.addresses)
      return (
        <p>map here</p>
      )
    } else {
      return (
        <p>no map here</p>
      )
    }
  }
}


function mapStateToProps(state) {
  return {addresses: state.addresses}
}

export default connect(mapStateToProps)(Map)
