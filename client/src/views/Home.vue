<template>
  <div>
    <spinner v-if="isLoading"></spinner>
    <div v-if="!isLoading">
      <div class="jumbotron">
        <b-jumbotron header="Foodist" lead="Welcome to your foodist App"></b-jumbotron>
      </div>
      <BContainer fluid>
        <div class="d-flex flex-wrap">
          <div class="col">
            <div class="container with-opacity shadow-lg">
              <h2>Recommended Recipes</h2>
              <div class="block">
                <b-row>
                  <b-col cols="12" md="12" sm="4" v-for="(food, index) in sortedRecipes" :key="index" class="mb-2">
                    <div @click="navRecipe">
                      <DisplayEntityHome class="highlightCard" :displayData="food"/>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="container with-opacity shadow-lg">
              <h2>Expired Food</h2>
              <div class="block">
                <b-row>
                  <b-col cols="12" md="12" sm="4" v-for="(food, index) in expired" :key="index" class="mb-2">
                    <div @click="navFood">
                      <DisplayEntityHome class="highlightCard expired" @closeCardModal="close" :displayData="food"/>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="container with-opacity shadow-lg">
              <h2>Shortly Expired Food</h2>
              <div class="block">
                <b-row>
                  <b-col cols="12" md="12" sm="4" v-for="(food, index) in shortlyExpired" :key="index" class="mb-2">
                    <div @click="navFood">
                      <DisplayEntityHome class="highlightCard shortlyExpired" :displayData="food"/>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </BContainer>
      <div class="col">
        <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
        <p class="message" v-if="message">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import spinner from '@/components/Spinner.vue'
import DisplayEntityHome from '@/components/DisplayEntityHome.vue'

export default {
  name: 'home',
  components: {
    spinner,
    DisplayEntityHome
  },
  props: {
    currentUser: String
  },
  data() {
    return {
      isLoading: true,
      foods: [],
      expired: [],
      shortlyExpired: [],
      sortedRecipes: [],
      errorMessage: '',
      message: ''
    }
  },
  created() {
    this.getFood()
  },
  methods: {
    close() {
      this.$router.push({ name: 'foods' })
    },
    getFood() {
      Api.get('/v1/users/' + this.currentUser + '/food-items')
        .then((res) => {
          if (res.status === 200) {
            this.foods = this.checkExpiryDates(res.data)
            this.sortRecipesByIngredientMatches()
            this.isLoading = false
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 404) {
            console.log('Testing error' + error.response.status)
            this.errorMessage = 'Not found'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    },
    checkExpiryDates(foods) {
      foods.forEach(food => {
        const exprDate = new Date(food.expiryDate)
        const timeDifference = exprDate - new Date()
        if (timeDifference < 0) {
          food.expired = true
          this.expired.push(food)
        } else {
          // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
          const leftDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000))
          if (leftDays < 6) {
            food.reminder = true
            this.shortlyExpired.push(food)
          }
        }
      }
      )
      return foods
    },
    sortRecipesByIngredientMatches() {
      Api.get('/v1/users/' + this.currentUser + '/recipes')
        .then((recipeResponse) => {
          const recipeArray = recipeResponse.data

          // Function to count ingredient matches for a recipe
          function countIngredientMatches(recipe, foodItems) {
            const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.name)
            const matchingIngredients = recipeIngredients.filter((ingredient) =>
              foodItems.some((food) => food.name.toLowerCase() === ingredient.toLowerCase())
            )
            return matchingIngredients.length
          }

          // Sort recipes based on ingredient matches in descending order using shortlyExpired food items
          recipeArray.sort((recipe1, recipe2) => {
            const matches1 = countIngredientMatches(recipe1, this.shortlyExpired)
            const matches2 = countIngredientMatches(recipe2, this.shortlyExpired)
            return matches2 - matches1 // Sort in descending order
          })

          // Filter out recipes with no ingredient matches
          this.sortedRecipes = recipeArray
            .filter((recipe) => countIngredientMatches(recipe, this.shortlyExpired) > 0)
            .map((recipe) => ({
              ...recipe,
              ingredientMatches: countIngredientMatches(recipe, this.shortlyExpired)
            }))
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error)
        })
    },
    navFood() {
      this.$nextTick(() => {
        this.$router.push({ name: 'foods' })
      })
    },
    navRecipe() {
      this.$router.push({ name: 'recipes' })
    }
  }
}

</script>

<style scoped>

.container {
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: none !important;
  padding: 30px;
  border-radius: 20px;
}
.container.with-opacity {
  background-color: rgba(255, 255, 255, 0.75); /* White with high opacity */
}
.jumbotron {
  background-image:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("../assets/Banner.jpg");
  background-size: cover;
  color: mintcream
}

h2 {
  color: mediumseagreen;
}

.block {
border-top: 3px solid #80b095;
padding: 30px;
}
.expired {
border-left: 10px solid red;
border-right: 10px solid red;
}

.shortlyExpired {
border-left: 10px solid rgb(233, 206, 53);
border-right: 10px solid rgb(233, 206, 53);
}

</style>
