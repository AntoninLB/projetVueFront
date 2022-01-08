<template>
    <div>
      <div v-if="confirm && this.$route.name === 'modifier_categorie'">
        La nouvelle catégorie a bien été modifié
      </div>
      <div v-else-if="confirm && this.$router.name === 'ajouter_categorie'">
        La nouvelle catégorie a bien été ajouté
      </div>
      <div v-if="errorMessage">
       <error-label :errorMessage="this.errorMessage"/>
      </div>
        <div>
          <label for="libelle">Libelle</label>
          <input type="text" name="libelle" id="libelle" v-model="libelle"/>
        </div>
        <p>{{ libelle }}</p>
        <div>
          <label for="couleur">Couleur</label>
          <input type="text" name="couleur" id="libelle" v-model="couleur"/>
        </div>
        <div v-if="this.$route.name === 'modifier_categorie'">
          <button @click="modifierCategorie">Modifier</button>
        </div>
        <div v-else>
          <button @click="ajoutCategorie">Ajouter</button>
        </div>

    </div>
</template>
<script>
import { postCategorie, updateCategorie } from '../api/categorie'

import ErrorLabel from './ErrorLabel.vue'

export default {
  name: 'NouvelleCategorie',
  components: {
    ErrorLabel
  },
  data () {
    return {
      couleur: '',
      libelle: '',
      errorMessage: '',
      confirm: false
    }
  },
  methods: {
    async ajoutCategorie () {
      await postCategorie({
        libelle: this.libelle,
        couleur: this.couleur
      }).then(() => {
        this.confirm = true
        this.$router.push('/categorie')
      }).catch((error) => {
        console.log(error)
        this.errorMessage = 'Il faut vous identifier pour ajouter une nouvelle catégorie'
      })
    },
    async modifierCategorie () {
      await updateCategorie(this.$route.params.id, {
        libelle: this.libelle,
        couleur: this.couleur
      }).then(() => {
        this.confirm = true
        this.$router.push('/categorie')
      })
    }
  }
}
</script>
<style scoped>
</style>
