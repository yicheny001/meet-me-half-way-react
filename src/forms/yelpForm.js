import React, { Component } from 'react'
import addSearch from '../actions/addSearch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import {
 AutoComplete,
 Checkbox,
 RadioButtonGroup,
 Slider,
 TextField,
 Toggle
} from 'redux-form-material-ui'


const validate = values => {
 const errors = {}
 const requiredFields = [ 'query', 'limit' ]
 requiredFields.forEach(field => {
   if (!values[ field ]) {
     errors[ field ] = 'Required'
   }
 })
 return errors
}

class Form extends Component {

 onSubmit(data) {
   event.preventDefault()
   var {query, limit, sortBy, openNow} = data
   this.props.addSearch({query, limit, sortBy, openNow})
   this.changeCurrentVendorCss()
 }

 changeCurrentVendorCss(){
   document.getElementById('allStyles').style.backgroundColor='#ffffb3'
 }

 getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
 componentDidMount() {
   this.refs.query           // the Field
     .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
     .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
 }

 render() {
   const { handleSubmit, pristine, reset, submitting } = this.props
   let categories= [ 'pizza','ice cream', 'beer', 'jazz bar', 'museum','vegan','vegetarian' ]
   return (
     <form className='yelp-form' onSubmit={handleSubmit(data => this.onSubmit(data))}>
     <div>
       <Field name="query"
       component={TextField}
       hintText="Try 'Pizza' or 'Starbucks'!"
       floatingLabelText="What are you in the mood for?"
       ref="query"
       withRef/>
     </div>
     <div>
       <Field name="limit" component={TextField} type='number' min='0' max='20' floatingLabelText="Enter a number." floatingLabelText="How many places?"/>
     </div>
     <br/>
     <div>
       <Field name="sortBy" component={RadioButtonGroup}>
         <RadioButton value="0" label="Best match"/>
         <RadioButton value="1" label="By distance"/>
         <RadioButton value="2" label="By rating"/>
       </Field>
     </div>
     <br/>
     <div className='buttons'>
       <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Find Places!</button> &nbsp;
       <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={reset}>Clear</button>
     </div>
   </form>
   )
 }
}

Form.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({addSearch}, dispatch)
}

var SmartYelpForm = reduxForm({
 form: 'example',
   initialValues: {
     sortBy: 0
   },
 validate
})(Form)

export default connect(null, mapDispatchToProps)(SmartYelpForm)
