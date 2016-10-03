import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TravelModes from '../components/travelModes'
import Details from '../components/details'
import { addLengths, changeTravelMode } from '../actions/details'
import { addError } from '../actions/error'
import DistanceMatrix from '../modules/distanceMatrix'

const DetailsContainer = class extends Component {

  componentWillMount() {
    var { addresses, details: { travelMode, currentVendor: { lat, lng } } } = this.props
    var destination = {lat, lng}
    DistanceMatrix(addresses, destination, travelMode, this.callback.bind(this))
  }

  componentWillUpdate(nextProps) {
    if (this.props.details.travelMode === nextProps.details.travelMode) {
      return false
    }
    var { lat, lng } = nextProps.details.currentVendor
    var destination = {lat, lng}
    DistanceMatrix(this.props.addresses, destination, nextProps.details.travelMode, this.callback.bind(this))
  }

  callback(response, status) {
    var lengths = response.rows.map(row => {
      var element = row.elements[0]
      if (element.status === "ZERO_RESULTS") {
        return 'This form of transit is not available'
      }
      return `${element.distance.text} / ${element.duration.text} away`
    })
    this.props.addLengths(lengths)

  }

  handleClick(event) {
    var { changeTravelMode, details: {currentVendor}} = this.props
    var travelMode = event.target.parentElement.id
    if (travelMode === '') {
      travelMode = event.target.id
    }
    this.props.changeTravelMode({travelMode, currentVendor})
  }

  render() {
    if (this.props.details.lengths.length > 0) {
      var detailsForAddresses = []
      for (var i = 0; i < this.props.addresses.length; i++) {
        detailsForAddresses.push(<Details
          address={this.props.addresses[i]}
          length={this.props.details.lengths[i]}
          />)
      }
      return (
        <div>
          <TravelModes handleClick={this.handleClick.bind(this)} />
          {detailsForAddresses}
        </div>
      )
    } else {
      return null
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addLengths, changeTravelMode, addError}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, details: state.details}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
