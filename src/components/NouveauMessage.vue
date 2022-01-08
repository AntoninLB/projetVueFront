<template>
    <div>
      <div v-if="confirm && this.$route.name === 'modifier_message'">
        Le message a bien été modifié
      </div>
      <div v-else-if="confirm && this.$route.name === 'ajouter'">
        Le nouveau message a bien été ajouté
      </div>
      <div v-if="errorMessage">
        <error-label :errorMessage="this.errorMessage" />
      </div>
        <div>
          <label for="libelle">Titre</label>
          <input type="text" name="titre" id="titre" v-model="titre" />
        </div>
        <div>
          <label for="couleur">Message</label>
          <textarea name="" id="" cols="30" rows="10" placeholder="fefuhefuh" v-model="message">
          </textarea>
        </div>
        <label for="pet-select">Choisissez une catégorie</label>

        <select v-model="selected"  name="pets"  id="pet-select">
          <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id"> {{categorie.libelle}} </option>
        </select>
        <p> SELECTED => {{ selected }}</p>

        <div v-if="this.$route.name === 'modifier_message'">
          <button @click="modifierMessage">Modifier</button>
        </div>
        <div v-else>
          <button @click="ajoutMessage">Ajouter</button>
        </div>

    </div>
</template>
<script>
import { getCategorie, getCategories } from '../api/categorie'
import { postMessage, updateMessage, getMessage } from '../api/message'
import { getUser } from '../api/user'
import ErrorLabel from './ErrorLabel.vue'

export default {
  components: { ErrorLabel },
  name: 'NouveauMessage',
  data () {
    return {
      titre: '',
      message: '',
      categories: {},
      categorie: {},
      selected: '',
      messages: {},
      confirm: false,
      errorMessage: '',
      oldMessage: {},
      user: this.user,
      userId: Number
    }
  },
  async mounted () {
    this.categories = await getCategories().then((response) => {
      return response.data['hydra:member']
    })
    if (this.$route.name === 'modifier_message') {
      this.messages = await getMessage(this.$route.params.id).then((response) => {
        console.log(response)
        return response.data
      })
    }
  },

  methods: {

    async ajoutMessage () {
      this.user = await this.getUserWithId()
      console.log(this.user)
      await this.getCategorieWithId().then((data) => {
        console.log(data)
        console.log(this.user)
        postMessage({
          titre: this.titre,
          publishedAt: new Date(),
          message: this.message,
          categorie: data,
          user: this.user
        }).then((message) => {
          console.log('=====>', message)
          this.confirm = true
          this.$router.push('/messages')
        })
      })
    },
    async modifierMessage () {
      await this.getCategorieWithId().then((data) => {
        updateMessage(this.$route.params.id, {
          titre: this.titre,
          publishedAt: new Date(),
          message: this.message,
          categorie: data
        }).then(() => {
          this.confirm = true
          this.$router.push('/messages')
        })
      })
    },

    async getCategorieWithId () {
      return await getCategorie(this.selected).then((response) => {
        return response.data['@id']
      })
    },

    async getUserWithId () {
      this.userId = await JSON.parse(localStorage.getItem('user'))

      return await getUser(this.userId.id).then((response) => {
        return response.data['@id']
      })
    }
  }
}

</script>
<style scoped>
</style>
