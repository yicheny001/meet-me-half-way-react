import React, { Component } from 'react'
import axios from 'axios'
import AddressForm from '../components/addressForm'
import QueryForm from '../components/queryForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addAddress } from '../actions/addresses'
import { addSearch } from '../actions/search'
import { addError } from '../actions/error'

const styles = {
  'minWidth':'0px !important'
}

const FormsContainer = class extends Component {

  querySubmit(event) {
    event.preventDefault()
    var query = event.target.firstChild.children[2].value
    this.props.addSearch({query})
    this.scrollUp()
  }

  scrollUp() {
    parent = document.getElementsByClassName("aside")[0]
    element = document.getElementById('results')
    parent.animate({ scrollTop: element.offset().top - parent.offset().top }, { duration: 'slow', easing: 'swing'});

    document.getElementById('results').scrollIntoView({block: 'end', behavior: 'smooth'})
    setTimeout(scrollUp, 40);
  }

  addressSubmit(event) {
    event.preventDefault()
    var address = event.target.firstChild.firstChild.firstChild.value
    event.target.firstChild.firstChild.firstChild.value = ''
    this.makeRequest(address)
  }

  makeRequest(address) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA4X16Aq4qYw7WrqcvZGzdKgeeL26E5irc`)
    .then(resp => {
       let result = resp.data.results[0]
       this.addressData(result)
    }).catch(err => {
      console.log(err)
      this.props.addError(`Sorry, ${address} is not a valid address.`)
    })
  }

  addressData(result){
    let {lat, lng} = result.geometry.location
    let name = result.formatted_address
    if (this.props.addresses.find(address => address.name === name) !== undefined) {
      this.props.addError(`${name} is already a selected address.`)
      return false
    }
    this.props.addAddress({lat, lng, name})
  }

  render() {
    return (
      <div>
        <AddressForm onSubmit={this.addressSubmit.bind(this)} />
        <QueryForm onSubmit={this.querySubmit.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {addresses: state.addresses}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addAddress, addError, addSearch}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsContainer)
