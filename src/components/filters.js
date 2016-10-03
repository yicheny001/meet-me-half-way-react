import React from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'

const styles = {
  toggle: {
    width: 120
  },
  textField: {
    width: 140
  }
}

const Filters = ({handleChange, handleToggle, handleDragRadius, handleStopRadius, handleDragPrice, handleStopPrice}) => {
  return (
    <div className='filters'>
      <Toggle label="Open Now" style={styles.toggle} onToggle={handleToggle} />
      <TextField
      type="number"
      style={styles.textField}
      floatingLabelText="How many results?"
      onChange={handleChange}
      defaultValue={3}
      min={1}
      />
      <Slider defaultValue={1} min={0.5} max={1.5} onChange={handleDragRadius} onDragStop={handleStopRadius}/>
      <Slider defaultValue={4} min={1} max={4} step={1} onChange={handleDragPrice} onDragStop={handleStopPrice}/>
    </div>
  )
}

export default Filters
