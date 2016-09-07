import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addAddress from '../actions/addAddress'
import Geosuggest from 'react-geosuggest';

const EnterAddressContainer = class extends Component {

  onSubmit(event) {
    event.preventDefault()
    var address = event.target.firstChild.firstChild.firstChild.value
    event.target.firstChild.firstChild.firstChild.value = ''
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA4X16Aq4qYw7WrqcvZGzdKgeeL26E5irc`)
    .then(resp => {
       let result = resp.data.results[0]
       this.addressData(result)
    }).catch(err => {
      if (err) {
        console.log(err)
      }
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
      placeholder="Start typing!"
      onSuggestSelect={this.onSuggestSelect}
      onSubmit={this.onSubmit.bind(this)}
      country='us'
      />
      <button type="submit" className="btn btn-primary">Add Address</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addAddress}, dispatch)
}

export default connect(null, mapDispatchToProps)(EnterAddressContainer)
