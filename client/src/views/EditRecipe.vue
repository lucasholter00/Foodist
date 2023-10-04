<template>
  <b-container>
    <p>{{currentUser}}</p>
    <p>editObject: {{editObject}}</p>
    <p>Form: {{form}}</p>
    <b-col></b-col>
    <b-col cols="8">
      <b-form @submit="onSubmit">
        <b-button type="button" variant="danger" @click="setExistingIngredient">Reset</b-button>
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
            <b-button type="button" variant="primary" @click="removeIngredient(index)">Remove</b-button>
          </b-form-group>
        </div>
        <b-form-group
            id="RecipeDescription"
            label="Recipe Description"
            label-for="description-input"
        >
          <b-form-input
              id="description-input"
              placeholder="Enter the description needed to create the recipe!"
              v-model="form.description"
              type="text">
          </b-form-input>
        </b-form-group>
        <b-button type="button" variant="primary" @click="addIngredient">Add Ingredient</b-button>
        <b-button type="submit" variant="primary">Edit Recipe!</b-button>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-container>
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
      putName: '',
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
          }
        })
        .catch((error) => {
          // Handle network errors or other unexpected errors
          console.error('Error:', error)
          this.errorMessage = 'An error occurred while editing the recipe'
        })
    }
  },
  created() {
    this.setExistingIngredient()
  }
}

</script>
<style scoped>

</style>
