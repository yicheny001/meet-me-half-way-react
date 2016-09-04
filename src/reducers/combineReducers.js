import { combineReducers } from 'redux';
import addresses from './addresses'
import vendors from './vendors'
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  addresses,
  vendors,
  form
});

export default rootReducer;
