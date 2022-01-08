<template>
    <div>
        <div>
          <label for="libelle">Email</label>
          <input type="text" name="email" id="email" v-model="email"/>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="text" name="password" id="password" v-model="password"/>
        </div>
        <button @click="loginUser">Connection</button>
    </div>
</template>
<script>
import { login } from '../api/user'

export default {
  name: 'Note',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async loginUser () {
      await login(this.email, this.password).then((response) => {
        console.log('LOGIN =>', response)
      })
    }
  }
}
</script>
<style scoped>
</style>
