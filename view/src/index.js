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

import Hydrate from './components/Hydrate'
import ResetPassword from './components/ResetPassword'
import UserGate from './components/UserGate'
import Home from './components/Home'

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

const LoginRequired = () =>
  <UserGate>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </UserGate>

export const App = () =>
  <Provider store={store}>
    <Hydrate>
      <Router>
        <Switch>
          <Route path="/reset-password/:token" component={ResetPassword}/>
          <Route path="/reset-password" component={ResetPassword}/>
          <Route path="/" component={LoginRequired}/>
        </Switch>
      </Router>
    </Hydrate>
  </Provider>

render(<App/>, document.getElementById('root'));
registerServiceWorker();
