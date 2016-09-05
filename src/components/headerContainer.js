import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from './header.js'
import SelectedAddresses from './selectedAddresses'
import addVendors from '../actions/addVendors'
import removeAddress from '../actions/removeAddress'
import Center from '../modules/center'
import axios from 'axios'

const HeaderContainer = class extends Component {

  componentDidUpdate() {
    if (this.props.addresses.length >= 2 && this.props.search.query) {
      var {lat, lng} = Center(this.props.addresses).get()
      var {query, numberOfResults} = this.props.search
      axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}/${numberOfResults}`)
      .then(resp => {
        this.props.addVendors(resp.data.businesses)
      })
    }
  }

  remove(event) {
    event.preventDefault()
    this.props.removeAddress(event.target.previousSibling.innerHTML)
  }

  render() {
    if (this.props.search.query) {
      return (
        <div>
          <Header search={this.props.search}/>
          <SelectedAddresses addresses={this.props.addresses} remove={this.remove.bind(this)}/>
        </div>
      )
    }
    return <SelectedAddresses addresses={this.props.addresses} remove={this.remove.bind(this)}/>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addVendors, removeAddress}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, search: state.search}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
