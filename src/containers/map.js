import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addVendors from '../actions/addVendors'
import GoogleMaps from '../modules/googleMaps'
import axios from 'axios'

const Map = class extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.search.query || nextProps.search.query) {
      if (nextProps.addresses.length >= 2 && this.props.vendors === nextProps.vendors) {
        return false
      }
    }
    return true
  }

  componentDidUpdate() {
    document.getElementById('map').innerHTML = ''
    document.getElementById('map').style['background-color'] = ''
    if (this.props.addresses.length >= 2) {
      if (this.props.vendors.length > 0) {
        GoogleMaps(this.props.addresses, this.props.vendors).createMapWithBounds()
      } else {
        GoogleMaps(this.props.addresses).createMapWithBounds()
      }
    }
  }

  render() {
    return (
      <div id='map'></div>
    )
  }
}

function mapStateToProps(state) {
  return {addresses: state.addresses, vendors: state.vendors, search: state.search}
}

export default connect(mapStateToProps)(Map)
