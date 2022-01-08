import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/messages'

async function getMessages () {
  return await axios.get(BASE_URL)
}

async function postMessage (data) {
  return await axios.post(BASE_URL, data)
}

async function deleteMessage (id) {
  await axios.delete(BASE_URL + '/' + id)
}

async function updateMessage (id, data) {
  return await axios({
    method: 'patch',
    url: BASE_URL + '/' + id,
    data: data,
    headers: { 'Content-Type': 'application/merge-patch+json' }
  })
}

async function getMessage (id) {
  return await axios.get(BASE_URL + '/' + id)
}

async function searchMessage (titre) {
  return await axios.get(BASE_URL + '?titre=' + titre)
}

export {
  getMessages,
  deleteMessage,
  postMessage,
  updateMessage,
  getMessage,
  searchMessage
}
