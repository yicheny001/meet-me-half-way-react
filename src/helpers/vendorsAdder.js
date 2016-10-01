import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addVendors from '../actions/addVendors'
import addCurrentVendor from '../actions/addCurrentVendor'
import removeVendors from '../actions/removeVendors'
import addError from '../actions/addError'
import Center from '../modules/center'
import DistanceMatrix from '../modules/distanceMatrix'
import Avg from '../modules/avg'
import axios from 'axios'

const VendorsAdder = class extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.travelMode !== nextProps.travelMode) {
      return false // does not update if travelMode changes
    }
    return true
  }

  componentDidUpdate() {
    var { removeVendors, addresses, search } = this.props
    removeVendors()
    if (addresses.length >= 2 && search.query) {
      var center = Center(addresses)
      DistanceMatrix(addresses, center, 'DRIVING', this.callback.bind(this))
      // adds vendors if there are at least two inputted addresses and a query
    }
  }

  handleClick(currentVendor) {
    var { addCurrentVendor, travelMode } = this.props
    addCurrentVendor({currentVendor, travelMode})
    this.scrollTo(currentVendor)
  }

  scrollTo(vendor) {
    document.getElementById(`${vendor.name}`).scrollIntoView()
  }

  callback(response, status) {
    if (response.rows[0].elements[0].status === 'ZERO_RESULTS') {
      this.props.addError('Sorry, data for this query is unavailable.')
      return false
    }
    var data = this.fetchData(response)
    this.makeRequest(data)
  }

  fetchData(response) {
    var arrayOfDistances = response.rows.map(datum => datum.elements[0].distance.value)
    var radius = Avg(arrayOfDistances)/2 // sets a radial limit as a function of the average distance
    var { query } = this.props.search
    var { lat, lng } = Center(this.props.addresses)
    return {query, lat, lng, radius}
  }

  makeRequest({query, lat, lng, radius}) {
    axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}/${radius}`)
    .then(response => {
      var parsedData = JSON.parse(response.data)
      var vendors = parsedData.data.response.groups[0].items.map(item => item.venue)
      this.props.addVendors({vendors, handleClick: this.handleClick.bind(this)})
    })
  }

  render() {
    return null
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addVendors,
    addCurrentVendor,
    removeVendors,
    addError
  }, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, search: state.search, travelMode: state.details.travelMode}
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsAdder)
