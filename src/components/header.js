import React from 'react'
import converter from 'number-to-words'

const Header = ({query, limit}) => {
  var capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var term = 'places'
  if (limit === 1) {
    term = 'place'
  }
  return(
    <div className='header'>{capitalize(converter.toWords(limit))} {term} for {query} between:</div>
  )
}

export default Header
