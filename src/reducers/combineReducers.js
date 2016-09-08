import { combineReducers } from 'redux';
import addresses from './addresses'
import search from './search'
import vendors from './vendors'
import details from './details'
import map from './map'
import error from './error'
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  addresses,
  search,
  vendors,
  details,
  map,
  error,
  form
});

export default rootReducer;
