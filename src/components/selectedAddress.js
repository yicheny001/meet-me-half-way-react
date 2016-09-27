import React from 'react'

const SelectedAddress = ({address, remove}) => {
  return (
    <div>
      <p className='capCalibri'>{address.name}</p>
      <button onClick={remove} type="submit" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"><i className="material-icons">clear</i></button>
    </div>
  )
}

export default SelectedAddress
