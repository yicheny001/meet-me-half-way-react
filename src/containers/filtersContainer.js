import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLimit, toggleOpenNow, changeRadius, changePrice } from '../actions/vendors'
import Filters from '../components/filters'

const FiltersContainer = class extends Component {

  constructor(props) {
    super(props)
    this.state = {toggled: true, radius: 1, price: 4}
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

  handleDragRadius(event, value) {
    this.setState({radius: value})
  }

  handleStopRadius(event) {
    this.props.changeRadius(this.state.radius)
  }

  handleDragPrice(event, value) {
    this.setState({price: value})
  }

  handleStopPrice(event) {
    this.props.changePrice(this.state.price)
  }

  render() {
    return (
      <div>
        <Filters
        handleChange={this.handleChange.bind(this)}
        handleToggle={this.handleToggle.bind(this)}
        handleDragRadius={this.handleDragRadius.bind(this)}
        handleStopRadius={this.handleStopRadius.bind(this)}
        handleDragPrice={this.handleDragPrice.bind(this)}
        handleStopPrice={this.handleStopPrice.bind(this)}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLimit, toggleOpenNow, changeRadius, changePrice}, dispatch)
}

export default connect(null, mapDispatchToProps)(FiltersContainer)
