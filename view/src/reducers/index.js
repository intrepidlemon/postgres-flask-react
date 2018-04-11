import { combineReducers } from 'redux'

import account from './account'
import files from './files'

const reducer = combineReducers({
  account,
  files,
})

export default reducer
