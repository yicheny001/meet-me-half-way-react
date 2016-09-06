import { combineReducers } from 'redux';
import addresses from './addresses'
import search from './search'
import vendors from './vendors'
import details from './details'
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  addresses,
  search,
  vendors,
  details,
  form
});

export default rootReducer;
