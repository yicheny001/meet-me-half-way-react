import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoogleMaps from '../modules/googleMaps'
import addMap from '../actions/addMap'

const MapAdder = class extends Component {

  componentDidMount() {
    var map = GoogleMaps.createMap()
    this.props.addMap(map)
  }

  render() {
    return null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMap}, dispatch)
}

export default connect(null, mapDispatchToProps)(MapAdder)
