import { combineReducers } from 'redux';
import addressReducer from './addressReducer'

const rootReducer = combineReducers({
  addresses: addressReducer
});

export default rootReducer;
