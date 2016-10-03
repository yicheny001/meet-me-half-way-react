import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/header.js'
import SelectedAddress from '../components/selectedAddress'
import { removeAddress } from '../actions/addresses'
import { List } from 'material-ui/List';

const HeaderContainer = class extends Component {

  remove(event) {
    event.preventDefault()
    this.props.removeAddress(event.target.parentElement.nextSibling.innerHTML)
  }

  render() {
    var { addresses, query, limit } = this.props
    var selectedAddresses = addresses.map((address, index) => <SelectedAddress address={address} remove={this.remove.bind(this)} key={index}/>)
    if (query) {
      return (
        <List>
          <Header query={query} limit={limit}/>
          {selectedAddresses}
        </List>
      )
    }
    return <div>{selectedAddresses}</div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeAddress}, dispatch)
}

function mapStateToProps(state) {
  return {addresses: state.addresses, query: state.query, limit: state.vendors.limit}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
