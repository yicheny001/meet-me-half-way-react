import React from 'react'

const EnterAddress = ({onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' placeholder='Enter Address'/>
      <input type='submit'/>
    </form>
  )
}

export default EnterAddress
