<template>
    <div>
      <router-link :to="{name: 'ajouter_message'}">
      <div style="display: inline-block; border-radius: 50%; box-shadow: -1px 0px 6px 1px #d9dae2;">
        <button style="background-color: transparent; border: none; margin: 5px;">
          <img style="height: 50px; background-color: transparent;" src="../assets/icons/plus.png" alt="">
        </button>
      </div>
    </router-link>
      <h1>Mes messages</h1>
      <divItems>
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
        <p>Publié par {{ userEmail }}</p>
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
import { deleteMessage, getMessage } from '../api/message'
import { getUser } from '../api/user'
import styled from 'vue-styled-components'
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

export default {
  name: 'MesMessages',
  components: {
    divItems,
    divItem,
    MessageButton,
    divContent
  },
  data () {
    return {
      messages: [],
      userEmail: ''
    }
  },
  async mounted () {
    this.getMyMessages()
  },
  methods: {
    getMyMessages () {
      this.getUserEmail()
      this.getUserWithId().then((data) => {
        data.messages.map(element => {
          const messageId = element.split('/')[3]
          getMessage(messageId).then((response) => {
            this.messages.push(response.data)
            return response.data
          })
        })
      })
    },
    async getUserWithId () {
      this.userId = await JSON.parse(localStorage.getItem('user'))

      return await getUser(this.userId.id).then((response) => {
        return response.data
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
    async supprimerMessage (id) {
      await deleteMessage(id).then(() => {
        this.messages = []
        this.getMyMessages()
      })
    },
    async getUserEmail () {
      this.userEmail = await this.getUserWithId().then((response) => {
        console.info(response.email)
        return response.email
      })
    }
  }
}
</script>
<style scoped>
</style>
