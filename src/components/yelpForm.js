import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form';
import addVendors from '../actions/addVendors'
import axios from 'axios'
import GoogleMaps from '../modules/googleMaps'

const FIELDS = {
  query: {
    type: 'input',
    label: 'What are you looking for?'
  },
  numberOfResults: {
    type: 'input',
    label: 'Number of Results'
  }
};

class YelpForm extends Component {

  componentDidMount() {
    this.props.fields.numberOfResults.autofill(1)
  }

  onSubmit(props) {
    if (this.props.addresses.length < 2) {
      document.getElementsByClassName('error').innerHTML = 'Please enter at least two addresses.'
    } else {
      var {lat, lng} = GoogleMaps(this.props.addresses).center
      var {query, numberOfResults} = props
      axios.get(`http://localhost:3006/heycutie/${query}/${lat}/${lng}/${numberOfResults}`)
      .then(resp => {
        this.props.addVendors(resp.data.businesses)
      })
    }
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field]
    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : '' }`} >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))} >
        <div className='error'></div>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `${field} is required`;
    }
  });
  return errors;
}

function mapStateToProps(state) {
  return {addresses: state.addresses}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addVendors}, dispatch)
}

var SmartYelpForm = reduxForm({
  form: 'Yelp Form',
  fields: _.keys(FIELDS),
  validate
})(YelpForm);

export default connect(mapStateToProps, mapDispatchToProps)(SmartYelpForm)
