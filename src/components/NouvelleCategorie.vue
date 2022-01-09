<template>
    <div class="container">
  <div class="card">
    <form class="card-form">
      <div class="input">
        <input name="libelle" id="libelle" v-model="libelle" type="text" class="input-field" required/>
        <label for="libelle" class="input-label">Libelle</label>
      </div>
      <div class="input">
        <input name="couleur" id="couleur" v-model="couleur" type="couleur" class="input-field" required/>
        <label for="couleur" class="input-label">Couleur</label>
      </div>
    </form>
      <div class="action" v-if="this.$route.name === 'modifier_categorie'">
          <button class="action-button" @click="modifierCategorie">Modifier</button>
        </div>
        <div class="action" v-else>
          <button class="action-button" @click="ajoutCategorie">Ajouter</button>
        </div>
  </div>
</div>
</template>
<script>
import { postCategorie, updateCategorie } from '../api/categorie'

export default {
  name: 'NouvelleCategorie',
  components: {
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

body {
font-family: "DM Sans", sans-serif;
line-height: 1.5;
background-color: #f1f3fb;
padding: 0 2rem;
}

img {
max-width: 100%;
display: block;
}

.card {
  margin: 2rem auto;
display: flex;
flex-direction: column;
width: 100%;
max-width: 425px;
background-color: #FFF;
border-radius: 10px;
box-shadow: 0 10px 20px 0 rgba(#999, .25);
padding: .75rem;
}

.card-image {
  border-radius: 8px;
overflow: hidden;
padding-bottom: 65%;
background-image: url('https://assets.codepen.io/285131/coffee_1.jpg');
background-repeat: no-repeat;
background-size: 150%;
background-position: 0 5%;
position: relative;
}

.card-heading {
  position: absolute;
left: 10%;
top: 15%;
right: 10%;
font-size: 1.75rem;
font-weight: 700;
color: #735400;
line-height: 1.222;
}
.small {
  display: block;
font-size: .75em;
font-weight: 400;
margin-top: .25em;
}

.card-form {
  padding: 2rem 1rem 0;
}

.input {
  display: flex;
flex-direction: column-reverse;
position: relative;
padding-top: 1.5rem;

}
  input {
  appearance: none;
  border-radius: 0;
  }
.input {
  margin-top: 1.5rem;
}

.input-label {
color: #8597a3;
position: absolute;
top: 1.5rem;
transition: .25s ease;
}

.input-field {
border: 0;
z-index: 1;
background-color: transparent;
border-bottom: 2px solid #eee;
font: inherit;
font-size: 1.125rem;
padding: .25rem 0;
}
.input-label {
color: #6658d3;
transform: translateY(-1.5rem);
}

.action {
margin-top: 2rem;
}

.action-button {
font: inherit;
font-size: 1.25rem;
padding: 1em;
width: 100%;
font-weight: 500;
background-color: #6658d3;
border-radius: 6px;
color: #FFF;
border: 0;
}

.card-info {
padding: 1rem 1rem;
text-align: center;
font-size: .875rem;
color: #8597a3;
}
a {
display: block;
color: #6658d3;
text-decoration: none;
}
</style>
