import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateRecipe from './views/CreateRecipe.vue'
import CreateGroceryList from './views/CreateGroceryList.vue'
import Login from './views/Login.vue'
import Recipes from '@/views/Recipes.vue'
import Register from './views/Register.vue'
import GroceryLists from './views/GroceryList.vue'

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
      path: '/groceryList/create',
      name: 'Create grocery list',
      component: CreateGroceryList
    },
    {
      path: '/groceryList',
      name: 'Grocery list',
      component: GroceryLists
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/create-recipe',
      name: 'create-recipe',
      component: CreateRecipe
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
