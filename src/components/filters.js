import React from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'

const textStyle = {
  display: 'inline-block',
  marginRight: 5,
  marginLeft: 5,
  width: 135
}

const toggleStyle = {...textStyle, paddingLeft: 10, paddingRight: 10}


const Filters = ({handleChange, handleToggle, handleDragRadius, handleStopRadius, handleDragPrice, handleStopPrice}) => {
  return (
    <div className='filters'>
      <Toggle label="Open Now"
      style={toggleStyle}
      onToggle={handleToggle}
      />
      <TextField
      type="number"
      style={textStyle}
      floatingLabelText="How many results?"
      onChange={handleChange}
      defaultValue={3}
      min={1}
      />
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
