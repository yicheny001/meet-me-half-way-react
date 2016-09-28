import React from 'react'

const ShowDetailsButton = ({vendor, handleClick}) => {
  return <a href='#' data-id={vendor.id} className='oneVendor' onClick={handleClick}>Take Me There</a>
}

export default ShowDetailsButton
