<template>
  <div>
    <h2>Recipes</h2>
    <div v-if="!selectedRecipe">
      <div class="recipe-cards">
        <div v-for="(recipe, index) in recipes" :key="index" class="recipe-card">
          <router-link :to="'/recipes/' + recipe._id">
            <div class="recipe-card-title" @click="setSelectedRecipe(recipe)">{{ recipe.name }}</div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="selectedRecipe">
      <button @click="goBackToRecipes">Back to Recipes</button>
      <h3>{{ selectedRecipe.name }}</h3>
      <p>{{ selectedRecipe.description }}</p>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'recipes',
  props: {
    currentUser: {
      type: String
    }
  },
  data() {
    return {
      recipes: [],
      selectedRecipe: null,
      errorMessage: ''
    }
  },
  methods: {
    getRecipes() {
      const currentUser = this.currentUser
      Api.get('/v1/users/' + currentUser + '/recipes')
        .then((response) => {
          if (response.status === 200) {
            this.recipes = response.data
          }
        })
    },
    setSelectedRecipe(recipe) {
      event.preventDefault()
      this.selectedRecipe = recipe
    },
    goBackToRecipes(event) {
      event.preventDefault(event)
      // Clear the selectedRecipe to go back to the recipes list
      this.selectedRecipe = null
    }
  },
  created() {
    this.getRecipes()
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
