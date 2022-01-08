import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categorie from '../views/Categorie.vue'
import Message from '../views/Message.vue'
import CategorieMessage from '../components/CategorieMessage.vue'
import NouvelleCategorie from '../components/NouvelleCategorie.vue'
import NouveauMessage from '../components/NouveauMessage.vue'
import Login from '../components/Login.vue'
import MesMessages from '../components/MesMessages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: 'ajouter_categorie',
    name: 'ajouter_categorie',
    component: NouvelleCategorie
  },
  {
    path: 'modifier_categorie/:id',
    name: 'modifier_categorie',
    component: NouvelleCategorie
  },
  {
    path: '/categorie',
    name: 'Categorie',
    component: Categorie,
    children: [
      {
        path: ':id',
        name: 'categorie_message',
        component: CategorieMessage
      }
    ]
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Message
  },
  {
    path: '/ajouter_message',
    name: 'ajouter_message',
    component: NouveauMessage
  },
  {
    path: 'modifier_message/:id',
    name: 'modifier_message',
    component: NouveauMessage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mes_messages',
    name: 'mes_messages',
    component: MesMessages
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
