<template>
  <div class="home">
    <h1>que souhaitez-vous rechercher ?</h1>

    <div style="display: flex; justify-content:center;">
     <div style="display: flex; flex-direction: row;">
      <div>
        <label style="color: #6658d3;" for="searchCategorie">Categorie</label>
        <input type="checkbox" name="searchCategorie" id="searchCategorie" v-model="selectedCategorie" />
      </div>
      <div>
        <label style="color: #6658d3;" for="searchCategorie">Message</label>
        <input type="checkbox" name="searchMessage" id="searchMessage" v-model="selectedMessage" />
      </div>
     </div>
    </div>

    <div class="input">
      <input class="input-field" type="text" name="titre" id="titre" v-model="recherche" v-on:keydown="onChangeText" />
      <label class="input-label"  for="libelle">Recherche</label>
    </div>

    <cardList v-if="categories">
        <cardListItem v-for="categorie in categories" :key="categorie.id">
          <router-link style="text-decoration: none;" :to="{ name:'categorie_message', params: {id: categorie.id} }">
          {{ categorie.libelle }}
          </router-link>
          <buttonDiv>
            <MainButton>
              <router-link :to="{name:'modifier_categorie', params: {id: categorie.id}}">
              <img style="height: 30px;" src="../assets/icons/edit.png" alt=""/>
            </router-link>
            </MainButton>
            <MainButton style="color: red;" @click="supprimerCategorie(categorie.id)"><img src="../assets/icons/bin.png" alt=""></MainButton>
          </buttonDiv>
          </cardListItem>
    </cardList>

    <divItems v-if="messages">
      <divItem v-for="message in messages" :key="message.id">
        <divContent>
          <h2 style="color: #4330cc;">
            {{message.titre}}
          </h2>
        <p>
          {{message.message}}
        </p>
        <p>
          Publié le {{ formatDate(moment(message.publishedAt).format('LLLL'))[0] }}
          {{ formatDate(moment(message.publishedAt).format('LLLL'))[1] }}
          {{ formatDate(moment(message.publishedAt).format('LLLL'))[2] }}
          {{ formatDate(moment(message.publishedAt).format('LLLL'))[3] }}
          à
          {{ formatDate(moment(message.publishedAt).format('LLLL'))[4] }}
        </p>
        </divContent>
        <div style="display: flex; justify-content: space-evenly;">
          <MessageButton @click="supprimerMessage(message.id)">Supprimer</MessageButton>
          <MessageButton>
            <router-link style="text-decoration: none;" :to="{name:'modifier_message', params: {id: message.id}}">
              Modifier
            </router-link>
          </MessageButton>
        </div>
      </divItem>
    </divItems>

  </div>
</template>

<script>
import { searchCategorie } from '../api/categorie'

import styled from 'vue-styled-components'
import { searchMessage } from '../api/message'
import moment from 'moment'

export const divItems = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`
export const divItem = styled.div`
width: 40%;
border: 1px solid;
border-radius: 10px;
padding: 5px;
margin: 20px;
border-color:transparent;
background-color: #F8F8F8;
box-shadow:-1px 0px 6px 1px #d9dae2;
`

export const divContent = styled.div`
display: flex;
flex-direction: column;
`

export const MessageButton = styled.button`
border-color:transparent;
background-color: #F8F8F8;
box-shadow:-1px 0px 6px 1px #d9dae2;
`

export const cardList = styled.div`
overflow: hidden;
display: flex;
justify-content: center;
flex-wrap: wrap;
`

export const cardListItem = styled.div`
width: 20%;
box-sizing: border-box;
color: #171e42;
padding: 10px;
height: 100px;
display: flex;
flex-direction: column;
border: 1px solid;
border-radius: 10px;
padding: 5px;
margin: 20px;
border-color:transparent;
background-color: #F8F8F8;
box-shadow:-1px 0px 6px 1px #d9dae2;
`

export const buttonDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

export const MainButton = styled.button`
margin: 10px;
border-radius: 5px;
border: 1px solid;
border-color:transparent;
background-color: transparent;
`

export default {
  components: {
    cardList,
    cardListItem,
    MainButton,
    buttonDiv,
    divItems,
    divItem,
    MessageButton,
    divContent
  },
  name: 'Home',
  data: () => {
    return {
      recherche: '',
      categories: {},
      messages: {},
      selectedCategorie: false,
      selectedMessage: false
    }
  },
  watch: {
    selectedCategorie: function (params) {
      if (params) {
        this.selectedMessage = false
        this.messages = {}
      }
    },
    selectedMessage: function (params) {
      if (params) {
        this.selectedCategorie = false
        this.categories = {}
      }
    }
  },
  methods: {
    async searchCat () {
      this.categories = await searchCategorie(this.recherche).then((response) => {
        return response.data['hydra:member']
      })
    },
    async searchMess () {
      this.messages = await searchMessage(this.recherche).then((response) => {
        return response.data['hydra:member']
      })
    },
    moment (date) {
      moment.locale('fr')
      return moment(date)
    },
    formatDate (date) {
      const newDate = date.split(' ')
      return newDate
    },
    onChangeText () {
      if (this.selectedCategorie) {
        this.selectedMessage = false
        this.searchCat()
      } else {
        this.selectedCategorie = false
        this.searchMess()
      }
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

.input {
  display: flex;
flex-direction: column-reverse;
position: relative;
padding-top: 1.5rem;

}
  /* input {
  appearance: none;
  border-radius: 0;
  } */
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
</style>
