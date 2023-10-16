import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Foods from './views/Foods.vue'
import CreateRecipe from './views/CreateRecipe.vue'
import CreateGroceryList from './views/CreateGroceryList.vue'
import Login from './views/Login.vue'
import Recipes from '@/views/Recipes.vue'
import Register from './views/Register.vue'
import GroceryLists from './views/GroceryList.vue'
import EditRecipe from '@/views/EditRecipe.vue'
import EditGroceryList from '@/views/EditGroceryList'
import UserSettings from '@/views/UserSettings.vue'

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
      path: '/foods',
      name: 'foods',
      component: Foods
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
      path: '/user-settings',
      name: 'user-settings',
      component: UserSettings
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes

    },
    {
      path: '/recipes/create-recipe',
      name: 'create-recipe',
      component: CreateRecipe
    },
    {
      path: '/groceryList/edit',
      name: 'edit-groceryList',
      component: EditGroceryList
    },
    {
      path: '/recipes/edit-recipe',
      name: 'edit-recipe',
      component: EditRecipe
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
