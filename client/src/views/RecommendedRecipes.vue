<template>
  <div>
    <b-row class="mt-2">
  <b-col v-for="(recipe, index) in sortedRecipes" :key="index" cols="3" class="border-0">
    <BCardRec class="border-0" :foodItems="foodItems" :displayData="recipe" />
  </b-col>
    </b-row>
  </div>
</template>

<script>
import { Api } from '@/Api'
import BCardRec from '@/components/BCardRec.vue'
export default {
  name: 'recommendation',
  components: { BCardRec },
  props: {
    currentUser: {
      type: String
    }
  },
  data() {
    return {
      recipes: [],
      foodItems: [],
      sortedRecipes: [],
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
    getFoodItems() {
      Api.get('/v1/users/' + this.currentUser + '/food-items')
        .then((res) => {
          if (res.status === 200) {
            this.foodItems = res.data
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Not found'
          }
          if (error.response.status === 500) {
            this.$router.push({ name: 'ServerError' })
          }
        })
    },
    sortRecipesByIngredientMatches() {
      Api.get('/v1/users/' + this.currentUser + '/recipes')
        .then((recipeResponse) => {
          if (recipeResponse.status === 404) {
            this.errorMessage = 'Not found'
          }
          const recipeArray = recipeResponse.data

          Api.get('/v1/users/' + this.currentUser + '/food-items')
            .then((foodResponse) => {
              if (foodResponse.status === 404) {
                this.errorMessage = 'Not found'
              }
              const foodArray = foodResponse.data

              function countIngredientMatches(recipe) {
                const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.name)
                const matchingIngredients = recipeIngredients.filter((ingredient) =>
                  foodArray.some((food) => food.name === ingredient)
                )
                return matchingIngredients.length
              }

              recipeArray.sort((recipe1, recipe2) => {
                const matches1 = countIngredientMatches(recipe1)
                const matches2 = countIngredientMatches(recipe2)
                return matches2 - matches1 // Sort in descending order
              })

              // Store the sorted recipes in the data property
              this.sortedRecipes = recipeArray.map((recipe) => ({
                ...recipe,
                ingredientMatches: countIngredientMatches(recipe)
              }))
            })
            .catch((error) => {
              if (error.response.status === 404) {
                this.errorMessage = 'Not found'
              }
              if (error.response.status === 500) {
                this.$router.push({ name: 'ServerError' })
              }
            })
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Not found'
          }
          if (error.response.status === 500) {
            this.$router.push({ name: 'ServerError' })
          }
        })
    }
  },
  created() {
    this.getRecipes()
    this.getFoodItems()
    // Call the sorting method when both recipes and food items are fetched
    this.sortRecipesByIngredientMatches()
  }
}
</script>
