<template>
  <b-container fluid class="p-5">
    <b-row align-h="center" align-v="center">
      <b-col cols="10" sm="8" md="6" lg="3" class="bg-white roundContainer shadow-lg">
        <b-form @submit="onsubmit">
          <h2 class="p-3">Create a Recipe</h2>
          <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
          <p class="message" v-if="message">{{message}}</p>

          <b-form-group
            class="p-3"
            id="RecipeName"
            label="Recipe name:"
            label-for="name-input"
            label-size="lg"
            label-align="left"
          >
            <b-form-input
              id="name-input"
              placeholder="Enter recipe name"
              v-model="form.name"
              type="text">
            </b-form-input>
          </b-form-group>
          <div class="p-3" v-for="(ingredient, index) in form.ingredients" :key="index">
            <b-form-group
              :id="'Ingredient' + index"
              :label="'Ingredient ' + (index + 1) + ':'"
              label-size="lg"
              label-align="left"
            >
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
              <a class="removeButton" type="button" @click="removeIngredient(index)">Remove</a>
              <b-row align-h="center">
                <b-button v-if="index === (form.ingredients.length-1)" class="mt-5 grayText rounded-circle" type="field" variant="light" size="sm" @click="addIngredient">+</b-button>
              </b-row>

            </b-form-group>
          </div>
          <b-form-group
            class="p-3"
            id="RecipeDescription"
            label="Recipe Description:"
            label-for="description-input"
            label-size="lg"
            label-align="left"
          >
            <b-form-textarea
              id="description-input"
              placeholder="Enter the description needed to create the recipe!"
              v-model="form.description"
              type="text">
            </b-form-textarea>
          </b-form-group>
            <!-- Button to Add Ingredients to recipe -->
            <!-- Submit recipe Button -->
          <b-row class="p-4">
            <b-button class="w-100" type="submit" variant="success">Create</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>

    <p v-if="currentUser">Logged in user: {{currentUser}}</p>

  </b-container>
</template>

<script>
import { Api } from '@/Api'

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
      if (this.form.ingredients.length > 1) {
        this.form.ingredients.splice(index, 1)
      } else {
        this.errorMessage = "Can't remove more ingredients"
      }
    },
    onsubmit(event) {
      this.form.name = this.form.name.trim()
      // Update the v-model values for ingredients
      this.form.ingredients.forEach((ingredient) => {
        ingredient.name = ingredient.name.trim()
        ingredient.quantity = ingredient.quantity.trim()
        ingredient.unit = ingredient.unit.trim()
      }); this.message = ''
      this.errorMessage = ''
      event.preventDefault()
      const currentName = this.currentUser
      const recipeData = this.form
      if (this.formValidation() && this.numberInputValidation()) {
        Api.post('/v1/users/' + currentName + '/recipes', recipeData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (response.status === 201) {
              this.message = 'Recipe successfully saved!'
            } else if (response.status === 409) {
              this.errorMessage = 'Recipe name already taken! Try another name'
            }
            console.log(response.status)
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.errorMessage = 'Not found'
            }
            if (error.response.status === 500) {
              this.$router.push({ name: 'ServerError' })
            }
          })
      } else {
        this.errorMessage = 'Fields can not be left empty and/or quantity must be a number'
      }
    },
    formValidation() {
      return (!(this.form.name.trim().length === 0 || !this.isArrayNotEmpty(this.form.ingredients)))
    },
    isArrayNotEmpty(arr) {
      if (!Array.isArray(arr)) {
        return false // Not an array
      }

      return arr.every((ingredient) => {
        return (
          ingredient.name.trim() !== '' &&
          ingredient.quantity.trim() !== '' &&
          ingredient.unit.trim() !== ''
        )
      })
    },
    numberInputValidation() {
      for (const ingredient of this.form.ingredients) {
        if (isNaN(Number(ingredient.quantity))) {
          return false
        }
      }
      return true
    }
  }
}
</script>
