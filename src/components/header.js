import React from 'react'
import converter from 'number-to-words'

const Header = ({search}) => {
  var term = 'places'
  if (search.limit === 1) {
    term = 'place'
  }
  return <div>{converter.toWords(search.limit)} {term} for {search.query} between:</div>
}

export default Header
