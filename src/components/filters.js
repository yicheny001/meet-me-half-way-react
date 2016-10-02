import React from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

const styles = {
  toggle: {
    width: 120
  },
  textField: {
    width: 140
  }
}

const Filters = ({handleChange, handleToggle}) => {
  return (
    <div className='filters'>
      <Toggle label="Open Now" style={styles.toggle} onToggle={handleToggle} />
      <TextField
      type="number"
      style={styles.textField}
      floatingLabelText="How many results?"
      onChange={handleChange}
      defaultValue={3}
      />
    </div>
  )
}

export default Filters
