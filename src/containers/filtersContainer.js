import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import changeLimit from '../actions/changeLimit'
import toggleOpenNow from '../actions/toggleOpenNow'
import Filters from '../components/filters'

const FiltersContainer = class extends Component {

  handleChange(event) {
    var limit = event.target.value
    if (limit !== '') {
      this.props.changeLimit(limit)
    }
  }

  handleToggle(event) {
    var openNow = event.target.value
    this.props.toggleOpenNow(openNow)
  }

  render() {
    return (
      <div>
        <Filters handleChange={this.handleChange.bind(this)} handleToggle={this.handleToggle.bind(this)}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLimit, toggleOpenNow}, dispatch)
}

export default connect(null, mapDispatchToProps)(FiltersContainer)
