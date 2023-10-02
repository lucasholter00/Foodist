<template>
  <div>
    <h2>Create a Recipe</h2>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
    <b-row align-h="center" align-v="center">
      <b-form @submit="onsubmit">
        <b-form-group
          id="RecipeName"
          label="Recipe name"
          label-for="name-input">
          <b-form-input
            id="name-input"
            placeholder="Enter recipe name"
            v-model="form.name"
            type="text">
          </b-form-input>
        </b-form-group>
        <div v-for="(ingredient, index) in form.ingredients" :key="index">
          <b-form-group :id="'Ingredient' + index" :label="'Ingredient ' + (index + 1)">
            <div class="ingredient-inputs">
              <b-form-input
                :id="'ingredient-name-input-' + index"
                placeholder="Ingredient Name"
                v-model="ingredient.name"
                type="text">
              </b-form-input>
              <b-form-input
                :id="'quantity-input-' + index"
                placeholder="Quantity"
                v-model="ingredient.quantity"
                type="text">
              </b-form-input>
              <b-form-input
                :id="'unit-input-' + index"
                placeholder="Unit"
                v-model="ingredient.unit"
                type="text">
              </b-form-input>
            </div>
            <v-button type="button" variant="primary" @click="removeIngredient(index)">Remove</v-button>
          </b-form-group>
        </div>
        <b-form-group
          id="RecipeDescription"
          label="Recipe Description"
          label-for="description-input">
          <b-form-input
            id="description-input"
            placeholder="Enter the description needed to create the recipe!"
            v-model="form.description"
            type="text">
          </b-form-input>
        </b-form-group>
          <!-- Button to Add Ingredients to recipe -->
          <b-button type="button" variant="primary" @click="addIngredient">Add Ingredient</b-button>
          <!-- Submit recipe Button -->
          <b-button type="submit" variant="primary">Submit Recipe!</b-button>
      </b-form>
    </b-row>

    <p v-if="currentUser">Logged in user: {{currentUser}}</p>

  </div>
</template>

<script>
// import { Api } from '@/Api'; add back when user logic gets merged
import { Api } from '@/Api'
// import currentUser from 'eslint-plugin-vue/lib/meta'
// const { currentUser } = defineProps(['currentUser'])

export default {
  name: 'create-recipe',
  props: {

    currentUser: {
      type: String
    }
  },
  data() {
    return {
      form: {
        name: '',
        ingredients: [{ name: '', quantity: '', unit: '' }],
        description: ''
      },
      errorMessage: '',
      message: ''
    }
  },
  methods: {
    addIngredient() {
      this.form.ingredients.push({ name: '', quantity: '', unit: '' })
    },
    removeIngredient(index) {
      this.form.ingredients.splice(index, 1)
    },
    onsubmit(event) {
      event.preventDefault()
      const currentName = this.currentUser
      const recipeData = this.form

      Api.post('/v1/users/' + currentName + '/recipes', recipeData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.status === 201) {
            this.message = 'Recipe successfully saved!'
          }else if (response.status === 409){
            this.errorMessage = 'Recipe name already taken!'
          } else {
            this.errorMessage = 'Error saving recipe. Please try again.'
          }
        })
        .catch((error) => {
          this.errorMessage = 'An error occurred. Please try again later.'
          console.error(error)
        })
    }

  }
}

</script>

<style scoped>

</style>
