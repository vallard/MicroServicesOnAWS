
import {
  GOT_PHOTOS,
  GET_PHOTOS,
  DEL_PHOTO,
  UP_PHOTO,
  PHOTO_ERROR,
} from './constants';

export const gotError = (error) => ({
  type: PHOTO_ERROR,
  error
})

export const gotPhotos = (photos) => ({
  type: GOT_PHOTOS, 
  photos
})

export const getPhotos = () => ({
  type: GET_PHOTOS,
})


export const delPhoto = (photo) => ({
  type: DEL_PHOTO,
  id: photo
})

export const upPhoto = (data) => ({
  type: UP_PHOTO,
  data: data
})
