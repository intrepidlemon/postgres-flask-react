import { GET, POST, createFormData } from '../utils/fetch'

export const UPDATE_IMAGES = 'update images'
export const upload = files => dispatch =>
  POST({
    url: "/upload",
    data: createFormData(files),
  })
  .then( ({ status, data })  => {
    if (status === 200) {
      return dispatch({
        type: UPDATE_IMAGES,
        status,
        data: [data],
      })
    }
    return {
      status,
      error: data,
    }
  })

export const getImages = () => dispatch =>
  GET({
    url: "/image",
  })
  .then( ({ status, data })  => {
    if (status === 200) {
      const { images } = data
      return dispatch({
        type: UPDATE_IMAGES,
        status,
        data: images,
      })
    }
    return {
      status,
      error: data,
    }
  })
