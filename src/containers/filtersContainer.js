import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLimit, toggleOpenNow } from '../actions/vendors'
import Filters from '../components/filters'

const FiltersContainer = class extends Component {

  constructor(props) {
    super(props);
    this.state = {toggled: true};
  }

  handleToggle(event) {
    this.setState({toggled: !this.state.toggled})
    this.props.toggleOpenNow(this.state.toggled)
  }

  handleChange(event) {
    var limit = event.target.value
    if (limit !== '') {
      this.props.changeLimit(limit)
    }
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
