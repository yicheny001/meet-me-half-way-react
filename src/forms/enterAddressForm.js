import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addAddress from '../actions/addAddress'
import addError from '../actions/addError'
import Geosuggest from 'react-geosuggest';

const EnterAddressForm = class extends Component {

  onSubmit(event) {
    event.preventDefault()
    var address = event.target.elements[0].value
    event.target.elements[0].value = ''
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
    this.props.addAddress({lat, lng, name})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
      <Geosuggest
      className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'
      placeholder="Start typing your address!"
      onSuggestSelect={this.onSuggestSelect}
      onSubmit={this.onSubmit.bind(this)}
      country='us'
      onFocus={this.onFocus}
      />
      <button type="submit" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"><i className="material-icons">add</i></button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addAddress, addError}, dispatch)
}

export default connect(null, mapDispatchToProps)(EnterAddressForm)
