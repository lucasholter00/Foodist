import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateRecipe from './views/CreateRecipe.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create-recipe',
      name: 'create-recipe',
      component: CreateRecipe
    }
  ]
})
