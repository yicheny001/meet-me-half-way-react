import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form';
import addSearch from '../actions/addSearch'

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
    var {query, numberOfResults} = props
    this.props.addSearch({query, numberOfResults})
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
  return bindActionCreators({addSearch}, dispatch)
}

var SmartYelpForm = reduxForm({
  form: 'Yelp Form',
  fields: _.keys(FIELDS),
  validate
})(YelpForm);

export default connect(mapStateToProps, mapDispatchToProps)(SmartYelpForm)
