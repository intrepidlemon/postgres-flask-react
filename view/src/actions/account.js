import { GET, POST } from '../utils/fetch'

export const LOG_IN = 'log in'
export const LOG_OUT = 'log out'
export const login = credentials => dispatch =>
  POST({
    url: "/login",
    data: credentials,
  })
  .then( ({ status, data })  => {
    if (status === 200) {
      return dispatch({
        type: LOG_IN,
        status,
        data,
      })
    }
    return {
      status,
      error: data,
    }
  })

export const register = credentials => dispatch =>
  POST({
    url: "/register",
    data: credentials,
  })
  .then( ({ status, data })  => {
    if (status === 200) {
      return dispatch({
        type: LOG_IN,
        status,
        data,
      })
    }
    return {
      status,
      error: data,
    }
  })

export const user = () => dispatch =>
  GET({
    url: "/user",
  })
  .then( ({ status, data }) => {
    if (status === 200) {
      return dispatch({
        type: LOG_IN,
        status,
        data,
      })
    }
    return dispatch({
      type: LOG_OUT,
      status,
      error: data,
    })
  })

export const logout = () => dispatch =>
  POST({
    url: "/logout",
  })
  .then( ({ status, data })  => {
    if (status === 200) {
      return dispatch({
        type: LOG_OUT,
        status,
        data,
      })
    }
    return {
      status,
      error: data,
    }
  })

export const requestReset = email => dispatch =>
  POST({
    url: "/reset-password",
    data: { email },
  })

export const performReset = token => password => dispatch =>
  POST({
    url: `/reset-password/${token}`,
    data: { password },
  })
