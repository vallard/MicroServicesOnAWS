import {
  GET_PHOTOS,
  GOT_PHOTOS,
  PHOTO_ERROR,
  DEL_PHOTO,
  UP_PHOTO,
} from './constants';

const photos = (state = {
  photos: [],
  error: null,
  photo: "",
  data: "",
  loading: false,
  }, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {...state, loading: true, error: null}
    case GOT_PHOTOS:
      return {...state, loading: false, photos: action.photos, error: null};
    case PHOTO_ERROR: 
      return {...state, loading: false, photos: [], error: action.error};
    case DEL_PHOTO:
      return {...state, loading: true, photo: action.photo};
    case UP_PHOTO:
      return {...state, loading: true, data: action.data};
    default:
      return {...state}
  }
}
export default photos
