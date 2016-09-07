import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoogleMaps from '../modules/googleMaps'
import addMap from '../actions/addMap'
import axios from 'axios'

const Map = class extends Component {

  componentDidMount() {
    var map = GoogleMaps.createMap()
    this.props.addMap(map)
  }

  render() {
    return <div id='map'></div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMap}, dispatch)
}

export default connect(null, mapDispatchToProps)(Map)
