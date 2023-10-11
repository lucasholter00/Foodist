<template>
  <b-container-fluid class="p-5">
    <b-row align-h="center">
      <b-col cols="10" sm="8" md="6" lg="3" class="bg-white roundContainer shadow-lg">
        <b-form @submit="onSubmit">
          <h2 class="p-3">Edit Recipe</h2>
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
                    placeholder="name"
                    v-model="ingredient.name"
                    type="text"
                ></b-form-input>
                <b-form-input
                    :id="'quantity-input-' + index"
                    placeholder="Quantity"
                    v-model="ingredient.quantity"
                    type="text"
                ></b-form-input>
                <b-form-input
                    :id="'unit-input-' + index"
                    placeholder="Unit"
                    v-model="ingredient.unit"
                    type="text"
                ></b-form-input>
              </div>
              <a class="removeButton" type="button" variant="primary" @click="removeIngredient(index)">Remove</a>
            </b-form-group>
            <b-row align-h="center">
              <b-button v-if="index === (form.ingredients.length-1)" class="mt-5 grayText rounded-circle" type="field" variant="light" size="sm" @click="addIngredient">+</b-button>
            </b-row>
          </div>
          <b-form-group
            class="p-3"
              id="RecipeDescription"
              label="Recipe Description:"
              label-for="description-input"
              label-size="lg"
              label-align="left"
          >
            <b-form-input
                id="description-input"
                placeholder="Enter the description needed to create the recipe!"
                v-model="form.description"
                type="text">
            </b-form-input>
          </b-form-group>
          <b-row class="p-4">
            <b-button class="w-100" type="submit" variant="success">Edit</b-button>
          </b-row>
          <b-row align-h="center" class="px-4 pb-4">
            <b-button @click="setExistingIngredient" class="w-100" variant="danger">Reset</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container-fluid>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'edit-recipe',
  props: {
    currentUser: {
      type: String
    },
    editObject: {}
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
    setExistingIngredient() {
      this.form = JSON.parse(JSON.stringify(this.editObject))
    },
    onSubmit(event) {
      event.preventDefault()
      this.form.name = this.form.name.trim()
      this.message = ''
      this.errorMessage = ''
      const currentName = this.currentUser
      const recipeData = this.form
      const recipeName = this.editObject.name
      console.log(`/v1/users/${currentName}/recipes/${recipeName}`)
      Api.put(`/v1/users/${currentName}/recipes/${recipeName}`, recipeData, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => {
          if (response.status === 404) {
            this.errorMessage = 'User not found'
          } else if (response.status === 200) {
            this.message = 'Recipe edited successfully'
            this.navRecipe()
          }
        })
        .catch((error) => {
          // Handle network errors or other unexpected errors
          console.error('Error:', error)
          this.errorMessage = 'An error occurred while editing the recipe'
        })
    },
    navRecipe() {
      this.$router.push({ name: 'recipes' })
    }
  },
  created() {
    this.setExistingIngredient()
  }
}

</script>
<style scoped>

</style>
