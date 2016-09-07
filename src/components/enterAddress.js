import React from 'react'
import { Button } from 'react-bootstrap';


const EnterAddress = ({onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' placeholder='Enter Address'/>
      <button type="submit" className="btn btn-primary">Add Address</button>
    </form>
  )
}

export default EnterAddress
