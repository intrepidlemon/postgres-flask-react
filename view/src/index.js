import React from 'react'
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker';

import reducer from './reducers'
import './index.css';

import Register from './components/Register'

// middleware
const middleware = applyMiddleware(
  thunkMiddleware,
)

const envCompose = process.env.NODE_ENV !== "production"
  ? composeWithDevTools
  : compose

const store = createStore(
  reducer,
  envCompose(middleware)
)

export const App = () =>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={Register}/>
      </Switch>
    </Router>
  </Provider>

render(<App/>, document.getElementById('root'));
registerServiceWorker();
