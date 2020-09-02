//const hname = window.location.hostname
//export const API = "http://" + hname + ":5000"
export const API = "http://10.10.20.200.xip.io"
export const getAPI = API + "/images/list";
export const delAPI = API + "/images/delete";
export const upAPI = API + "/images/upload";

const api = {
  get() {
    return fetch(getAPI, {})
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( (error) => {
      console.log("catch error: " , error)
      return error
    })
  },
  del(userData) { 
    return fetch(delAPI, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id" : userData.id
      }),
    })
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( (error) => {
      console.log("catch error: " , error)
      return error
    })
  },
  up(userData) {
    return fetch(upAPI, {
        method: 'POST',
        body:  userData,
    })
    .then(statusHelper)
    .then(data => {
      return data
    })
    .catch( (error) => {
      console.log("catch error: " , error)
      return error
    })
  },
}

// thanks: https://github.com/redux-saga/redux-saga/issues/561
function statusHelper (response) {
  let json = response.json(); // there's always a body.
  if (response.status >= 200 && response.status < 300) {
    return json.then(Promise.resolve(response))
  } else {
    if (! json.error) {
      json.error = "Unable to get server settings."
    }
    return json.then(Promise.reject.bind(Promise))
  }
}

export default api;

