import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/categories'

async function getCategories () {
  return await axios.get(BASE_URL)
}

async function getCategorie (id) {
  return await axios.get(BASE_URL + '/' + id)
}

async function postCategorie (data) {
  return await axios.post(BASE_URL, data)
}

async function deleteCategorie (id) {
  return await axios.delete(BASE_URL + '/' + id)
}

async function updateCategorie (id, data) {
  return await axios({
    method: 'patch',
    url: BASE_URL + '/' + id,
    data: data,
    headers: { 'Content-Type': 'application/merge-patch+json' }
  })
}

async function searchCategorie (libelle) {
  return await axios.get(BASE_URL + '?libelle=' + libelle)
}

export {
  getCategories,
  getCategorie,
  postCategorie,
  deleteCategorie,
  updateCategorie,
  searchCategorie
}
