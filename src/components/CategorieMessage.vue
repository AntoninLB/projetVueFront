<template>
    <div>
        <p>Liste des messages de la catégorie {{ categorie.libelle }}</p>
        <h2>Messages</h2>
        <article v-for="message in categorie.messages" :key="message.id">
          <h3> {{ message.titre }} </h3>
          <p> {{ message.publishedAt }} </p>
        </article>
    </div>
</template>
<script>
import { getCategorie } from '../api/categorie'

export default {
  name: 'CategorieMessage',
  data () {
    return {
      categorie: {}
    }
  },
  watch: {
    $route () {
      this.actualiseCategorie()
    }
  },
  mounted () {
    this.actualiseCategorie()
  },
  methods: {
    async actualiseCategorie () {
      this.categorie = await getCategorie(this.$route.params.id).then((response) => {
        return response.data
      })
    }
  }
}
</script>
<style scoped>
</style>
