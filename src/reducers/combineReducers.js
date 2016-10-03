import { combineReducers } from 'redux';
import addresses from './addresses'
import query from './query'
import vendors from './vendors'
import details from './details'
import map from './map'
import error from './error'

const rootReducer = combineReducers({
  addresses,
  query,
  vendors,
  details,
  map,
  error
});

export default rootReducer;
