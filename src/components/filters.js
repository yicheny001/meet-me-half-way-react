import React from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'
import { yellow600, yellow200, blue200, blue500 } from 'material-ui/styles/colors'

const styles = {
  toggle: {
    width: 120,
    didFlip: true,
    position: 'relative',
    cursor: 'pointer',
    overflow: 'visible',
    fill: blue500,
    color: blue500,
  },
  underline:{
    width: '65%',
  },
  textField:{
    color: blue500,
    borderColor: blue500,
    width: 150,
  },

  slider:{
    width:100,
    fill: blue500,
    border: blue500,
  }
}

const Filters = ({handleChange, handleToggle, handleDragRadius, handleStopRadius, handleDragPrice, handleStopPrice}) => {
  return (
    <div>
      <br />
      <Toggle
        label="OPEN NOW"
        elementStyle={styles.toggle}
        style={styles.toggle}
        onToggle={handleToggle}
      />
      <TextField
      type="number"
      style={styles.textField}
      floatingLabelText="HOW MANY RESULTS?"
      onChange={handleChange}
      defaultValue={3}
      min={1}
      underlineStyle={styles.textField}
      underlineFocusStyle={styles.textField}
      floatingLabelFocusStyle={styles.textField}
      />
      <Slider style={styles.slider} defaultValue={1} min={0.5} max={1.5} onChange={handleDragRadius} onDragStop={handleStopRadius}/>
      <Slider sliderStyle={styles.slider} defaultValue={4} min={1} max={4} step={1} onChange={handleDragPrice} onDragStop={handleStopPrice}/>
    </div>
  )
}

export default Filters
