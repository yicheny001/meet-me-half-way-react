import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxPromise from 'redux-promise'
import App from './App';
import rootReducer from './reducers/combineReducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer, window.devToolsExtension ? window.devToolsExtension() : f => f)}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>,
  document.getElementById('root')
);
