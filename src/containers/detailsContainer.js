import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TravelModes from '../components/travelModes'
import Vendor from '../components/vendor'
import Details from '../components/details'
import addLengths from '../actions/addLengths'
import changeTravelMode from '../actions/changeTravelMode'
import DistanceMatrix from '../modules/distanceMatrix'

const DetailsContainer = class extends Component {

  shouldComponentUpdate(nextProps) {
    var details = this.props.details
    if (details.currentVendor !== nextProps.details.currentVendor || details.travelMode !== nextProps.details.travelMode) {
      if (nextProps.details.currentVendor.id) {
        var {lat, lng} = nextProps.details.currentVendor
        var destination = {lat, lng}
        DistanceMatrix(this.props.addresses, destination, nextProps.details.travelMode, this.callback.bind(this))
      }
    }
    return true
  }

  callback(response, status) {
    var lengths = response.rows.map(datum => {
      var element = datum.elements[0]
      return {distance: element.distance.text, time: element.duration.text}
    })
    this.props.addLengths(lengths)
  }

  handleClick(event) {
    var travelMode = event.target.innerHTML
    this.props.changeTravelMode(travelMode)
  }

  render() {
    if (this.props.details.lengths.length > 0) {
      var detailsForAddresses = []
      for (var i = 0; i < this.props.addresses.length; i++) {
        detailsForAddresses.push(<Details
          address={this.props.addresses[i]}
          distance={this.props.details.lengths[i].distance}
          time={this.props.details.lengths[i].time}
          />)
      }
      return (
        <div>
          <TravelModes handleClick={this.handleClick.bind(this)} />
          <Vendor vendor={this.props.details.currentVendor} />
          {detailsForAddresses}
        </div>
      )
    } else {
      return null
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addLengths, changeTravelMode}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, details: state.details}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
