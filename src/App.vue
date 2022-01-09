<template>
  <div id="app">
    <div id="nav">
      <router-link class="link" to="/">Accueil</router-link> |
      <router-link class="link" to="/categorie">Categories</router-link> |
      <router-link class="link" to="/messages">Messages</router-link> |
      <div v-if="!isLogged()">
        <router-link class="link" to="/login">Connexion</router-link> |
      </div>
      <div v-if="isLogged()">
        <router-link class="link" to="/mes_messages">Mes messages</router-link>
       | <router-link @click.native="logoutUser" to="/login">Deconnexion</router-link>
      </div>
    </div>
    <router-view/>
    <!-- <list-note /> -->
  </div>
</template>

<script>
// import ListNote from './components/ListNote.vue'
import { logout } from './api/user'

export default {
  // components: { ListNote },
  name: 'App',
  methods: {
    async logoutUser () {
      await logout()
    },
    isLogged () {
      const token = localStorage.getItem('usertoken')
      console.log(token)
      if (token) {
        return true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.link {
  margin: 3px;
}
</style>
