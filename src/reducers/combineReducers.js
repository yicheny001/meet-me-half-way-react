import { combineReducers } from 'redux';
import addresses from './addresses'
import search from './search'
import vendors from './vendors'
import details from './details'
import map from './map'
import error from './error'

const rootReducer = combineReducers({
  addresses,
  search,
  vendors,
  details,
  map,
  error
});

export default rootReducer;
