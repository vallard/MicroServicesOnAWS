//import { API, Storage, Logger } from 'aws-amplify';
import { API, Storage } from 'aws-amplify';
import { APINAME  } from '../../config';

//Logger.LOG_LEVEL = 'DEBUG'

const api = {
  get() {
    const path = '/photos';
    const myInit = {
    }
    return API.get(APINAME, path, myInit);
  },

  del(userData) { 
    const path = `/photos?id=${userData.id}`;
    return API.del(APINAME, path, null);
  },

  /* uploading a photo is a two part operation: 
   * 1. Upload the photo to S3 directly
   * 2. Write the photo upload into a database.
  */

  up(photoData) {
    return Storage.put(photoData.name, photoData, {
      level: 'private',
      contentype: photoData.type
    })
  },
  write(data) {
    const path = '/photos';
    const myInit = {
      body: {
        "name" : data.name,
      }
    }
    return API.post(APINAME, path, myInit);
  }
}

export default api;

