import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addAddress from '../actions/addAddress'
import EnterAddress from './enterAddress'

const EnterAddressContainer = class extends Component {

  onSubmit(event) {
    event.preventDefault()
    var address = event.target.firstChild.value
    event.target.firstChild.value = ''
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA4X16Aq4qYw7WrqcvZGzdKgeeL26E5irc`)
    .then(resp => {
       let result = resp.data.results[0]
       let {lat, lng} = result.geometry.location
       let name = result.formatted_address
       this.props.addAddress({lat, lng, name})
    }).catch(err => {
      if (err) {
        console.log('throww')
        console.log(err)
      }
   })
  }

  render() {
    return (
      <div>
        <EnterAddress onSubmit={this.onSubmit.bind(this)}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addAddress}, dispatch)
}

export default connect(null, mapDispatchToProps)(EnterAddressContainer)
