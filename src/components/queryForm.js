import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { yellow600, yellow200, blue200, blue500 } from 'material-ui/styles/colors'

const styles = {
  label: {
    color:'#fff',
    letterSpacing: '0.1em'
  }
}

const QueryForm = ({onSubmit}) => {
  return (
    <form className='query-form' onSubmit={onSubmit}>
      <TextField className='query-text' hintText="Try 'Pizza' or 'Starbucks'!" floatingLabelText="WHAT ARE YOU IN THE MOOD FOR?" />
      <br/>
      <FlatButton type='submit' label="FIND PLACES!" backgroundColor={blue500} labelStyle={styles.label}	hoverColor={yellow200} /> &nbsp; &nbsp; &nbsp;
      <FlatButton label="CLEAR" backgroundColor={yellow600} labelStyle={styles.label}	hoverColor={blue200} />
    </form>
  )
}

export default QueryForm
