import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import addAddress from '../actions/addAddress'
import deleteAddress from '../actions/deleteAddress'
import SelectedAddress from './selectedAddress'


const EnterAddress = class extends Component {

  onSubmit(event) {
    event.preventDefault()
    var address = event.target.firstChild.value
    event.target.firstChild.value = ''
    axios({
     method: 'get',
     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA4X16Aq4qYw7WrqcvZGzdKgeeL26E5irc`
   }).then(resp => {
     let result = resp.data.results[0]
     let lat = result.geometry.location.lat
     let lng = result.geometry.location.lng
     let name = result.formatted_address
     this.props.addAddress({lat, lng, name})
   }).catch(err => {
     debugger
     if (err) {
       console.log('throww')
     }
   })
  }

  removeAddress(event) {
    event.preventDefault()
    this.props.deleteAddress(event.target.previousSibling.innerHTML)
  }


  submitSearch(){
    axios({
      method: 'get',
      url: `http://localhost:3006/heycutie/coffee/chicago`
    }).then(resp=>{
      console.log(resp.data.businesses)
    })
  }

  render() {
    var addresses = this.props.addresses.map(address => {
      return <SelectedAddress key={address.name} address={address.name} remove={this.removeAddress.bind(this)}/>
    })
    return (
      <div>
        <form onSubmit={props => this.onSubmit(props)}>
          <input type='text' placeholder='enter your address'/>
          <input type='submit'/>
        </form>
        <button onClick={this.submitSearch.bind(this)} type='submit'> Find Places </button>
        {addresses}
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({addAddress, deleteAddress}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses}
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterAddress)
