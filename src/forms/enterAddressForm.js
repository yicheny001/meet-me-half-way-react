import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addAddress from '../actions/addAddress'
import addError from '../actions/addError'
import Geosuggest from 'react-geosuggest';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  'minWidth':'0px !important'
}

const EnterAddressForm = class extends Component {

  onSubmit(event) {
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
    this.props.addAddress({lat, lng, name})
  }

  render() {
    return (
      <form className='address-form' onSubmit={this.onSubmit.bind(this)}>
      <Geosuggest
      className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'
      placeholder="ADDRESS"
      onSuggestSelect={this.onSuggestSelect}
      onSubmit={this.onSubmit.bind(this)}
      country='us'
      onFocus={this.onFocus}
      onBlur={this.onBlur}
      />
      <FlatButton style={styles} type='submit' icon={<MapsAddLocation />} />
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addAddress, addError}, dispatch)
}

export default connect(null, mapDispatchToProps)(EnterAddressForm)
