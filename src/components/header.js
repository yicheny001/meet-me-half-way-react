import React from 'react'
import converter from 'number-to-words'
import {List, ListItem} from 'material-ui/List';


const Header = ({search}) => {
  var capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var term = 'places'
  if (search.limit === 1) {
    term = 'place'
  }
  return(
    <div className='header'>{capitalize(converter.toWords(search.limit))} {term} for {search.query} between:</div>
  )
}

export default Header
