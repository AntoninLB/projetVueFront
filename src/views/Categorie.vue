<template>
  <div class="categorie">
    <router-link :to="{name: 'ajouter_categorie'}">
      <div style="display: inline-block; border-radius: 50%; box-shadow: -1px 0px 6px 1px #d9dae2;">
        <button style="background-color: transparent; border: none; margin: 5px;">
          <img style="height: 50px; background-color: transparent;" src="../assets/icons/plus.png" alt="">
        </button>
      </div>
    </router-link>
    <h1>Liste des categories</h1>
    <cardList>
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
    <router-view/>
  </div>
</template>

<script>
import { deleteCategorie, getCategories } from '../api/categorie'
import { deleteMessage } from '../api/message'
import styled from 'vue-styled-components'

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
  name: 'Categorie',
  components: {
    cardList,
    cardListItem,
    MainButton,
    buttonDiv
  },
  data () {
    return {
      categories: null
    }
  },
  async mounted () {
    this.actualiseCategories()
  },
  methods: {
    async supprimerCategorie (id) {
      await this.categories.forEach(categorie => {
        if (categorie.id === id) {
          if (categorie.messages) {
            const messages = categorie.messages

            messages.forEach(message => {
              if (message) {
                deleteMessage(message.id).then(() => {
                  deleteCategorie(id)
                  this.actualiseCategories()
                })
              }
            })
          }
        }
      })
    },

    async actualiseCategories () {
      this.categories = await getCategories().then((response) => {
        console.log(response)
        return response.data['hydra:member']
      })
    }
  }

}
</script>
