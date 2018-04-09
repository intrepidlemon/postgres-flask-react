import * as actions from '../actions/account'

const defaultState = {
  status: null,
  id: null,
  email: null,
}

const saveAccount = (state, action) =>
  ({
    ...state,
    status: "logged-in",
    id: action.data.id,
    email: action.data.email,
  })

const logOut = (state, action) =>
  ({
    ...state,
    ...defaultState,
    status: "logged-out",
  })

const account = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOG_OUT:
      return logOut(state, action)
    case actions.LOG_IN:
      return saveAccount(state, action)
    default:
      return state
  }
}

export default account
