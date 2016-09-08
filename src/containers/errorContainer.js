import React, { Component } from 'react'
import { connect } from 'react-redux'
import Error from '../components/error'

const ErrorContainer = class extends Component {

  render() {
    return <Error error={this.props.error} />
  }
}

function mapStateToProps(state) {
  return {error: state.error}
}

export default connect(mapStateToProps)(ErrorContainer)
