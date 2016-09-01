import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as d3 from "d3";
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import { render } from 'react-dom';
import EnterAddress from './components/enterAddress';
import { Provider } from 'react-redux';
import Routes from './routes'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxPromise from 'redux-promise'
import App from './App';
import rootReducer from './reducers/combineReducers'
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
<Provider store={createStoreWithMiddleware(rootReducer)}>
  <Router history={browserHistory} routes={Routes} />
</Provider>,
document.getElementById('root')
);
