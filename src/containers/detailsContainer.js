import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TravelModes from '../components/travelModes'
import Vendor from '../components/vendor'
import Details from '../components/details'
import addLengths from '../actions/addLengths'
import changeTravelMode from '../actions/changeTravelMode'
import addError from '../actions/addError'
import DistanceMatrix from '../modules/distanceMatrix'

const DetailsContainer = class extends Component {

  shouldComponentUpdate(nextProps) {
    var details = this.props.details
    if (details.currentVendor !== nextProps.details.currentVendor || details.travelMode !== nextProps.details.travelMode) {
      // only rerender details if currentVendor or travelMode changes
      if (nextProps.details.currentVendor.id) {
        // only show details if currentVendor exists
        var {lat, lng} = nextProps.details.currentVendor
        var destination = {lat, lng}
        DistanceMatrix(this.props.addresses, destination, nextProps.details.travelMode, this.callback.bind(this))
      }
    }
    return true
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
    var travelMode = event.target.dataset.mode
    this.props.changeTravelMode(travelMode)
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

          <div id="demo-toast-example" className="mdl-js-snackbar mdl-snackbar">
            <div className="mdl-snackbar__text"></div>
            <button className="mdl-snackbar__action" type="button"></button>
          </div>

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
  return bindActionCreators({addLengths, changeTravelMode, addError}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, details: state.details}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
