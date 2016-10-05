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
const textStyle = {
  display: 'inline-block',
  marginRight: 5,
  marginLeft: 5,
  width: 135
}

const toggleStyle = {...textStyle, paddingLeft: 10, paddingRight: 10}

const Filters = ({handleChange, handleToggle, handleDragRadius, handleStopRadius, handleDragPrice, handleStopPrice}) => {
  return (
    <div>
      <br />
      <div className='filters'>
      <Toggle
        label="OPEN NOW"
        elementStyle={styles.toggle}
        style={toggleStyle}
        onToggle={handleToggle}
      />
      <TextField
      type="number"
      style={textStyle}
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
      <div className='slider-container'>
        <div className='slider-label'>Maximum Distance</div>
        <Slider
        defaultValue={1}
        min={0.5}
        max={1.5}
        onChange={handleDragRadius}
        onDragStop={handleStopRadius}
        />
      </div>
      <div className='slider-container'>
        <div className='slider-label'>Maximum Price</div>
        <Slider
        defaultValue={4}
        min={1}
        max={4}
        step={1}
        onChange={handleDragPrice}
        onDragStop={handleStopPrice}
        />
      </div>
    </div>
  )
}

export default Filters
