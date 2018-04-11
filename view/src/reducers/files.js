import * as actions from '../actions/files'
import * as account from '../actions/account'

const defaultState = {
  images: {},
}

const updateImage = (state, { data }) =>
  ({
    ...state,
    images: {
      ...state.images,
      [data.id]: data,
    }
  })

const updateImages = (state, { data }) =>
  data.reduce((state, image) => updateImage(state, { data: image}), state)

const logOut = (state, action) =>
  ({
    ...defaultState,
  })

const files = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_IMAGES:
      return updateImages(state, action)
    case account.LOG_OUT:
      return logOut(state, action)
    default:
      return state
  }
}

export default files
