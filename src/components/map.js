import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMaps from '../modules/googleMaps'

const Map = class extends Component {

  componentDidUpdate() {
    if (this.props.addresses.length > 0) {
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
  return {addresses: state.addresses, vendors: state.vendors}
}

export default connect(mapStateToProps)(Map)
