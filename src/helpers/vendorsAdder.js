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

  componentDidUpdate() {
    this.props.removeVendors()
    if (this.props.addresses.length >= 2 && this.props.search.query) {
      var center = Center(this.props.addresses)
      DistanceMatrix(this.props.addresses, center, 'DRIVING', this.callback.bind(this))
      // adds vendors if there are at least two inputted addresses and a query
    }
  }

  handleClick(vendor) {
    this.props.addCurrentVendor(vendor)
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
    var radius = Avg(arrayOfDistances)/5 // sets a radial limit as a function of the average distance
    var {query, limit} = this.props.search
    var {lat, lng} = Center(this.props.addresses)
    return {query, lat, lng, radius, limit}
  }

  makeRequest({query, lat, lng, radius, limit}) {
    axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}/${radius}/${limit}`)
    .then(response => {
      var vendors = response.data.businesses
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
  return {addresses: state.addresses, search: state.search}
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsAdder)
