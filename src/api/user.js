import axios from 'axios'
import router from '../router'

const BASE_URL = 'http://localhost:8000/'

async function login (email, password) {
  return await axios({
    url: BASE_URL + 'authentication_token',
    data: { email: email, password: password },
    method: 'POST'
  }) // username et password proviennent du formulaire
    .then((resp) => {
      console.log(resp)
      const token = resp.data.token
      const userData = atob(resp.data.token.split('.')[1]) // on récupère les données de l'utilisateur, par défaut, login, rôles
      localStorage.setItem('user', userData) // store the user in localstorage
      localStorage.setItem('usertoken', token) // store the token in localstorage
      router.push('/')
      console.log(userData)
      console.info('CONNEXION SUCCESS')
    })
    .catch((err) => {
      console.log(err)
      localStorage.removeItem('usertoken') // if the request fails, remove any possible user token if possible
    })
}

async function logout () {
  localStorage.removeItem('usertoken') // if the request fails, remove any possible user token if possible
  console.log('LOGOUT SUCCESS')
}

async function getUser (id) {
  return await axios.get(BASE_URL + 'api/users/' + id)
}

export { login, logout, getUser }
