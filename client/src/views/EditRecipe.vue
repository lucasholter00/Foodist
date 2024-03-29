<template>
  <b-container fluid class="p-5">
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
            <b-form-textarea
                id="description-input"
                placeholder="Enter the description needed to create the recipe!"
                v-model="form.description"
                type="text">
            </b-form-textarea>
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
      if (this.formValidation() && this.numberInputValidation()) {
        Api.put(`/v1/users/${currentName}/recipes/${recipeName}`, recipeData, {
          headers: { 'Content-Type': 'application/json' }
        })
          .then((response) => {
            if (response.status === 200) {
              this.message = 'Recipe edited successfully'
              this.navRecipe()
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 404) {
                this.errorMessage = 'User or recipe not found'
              } else if (error.response.status === 409) {
                this.errorMessage = 'Recipe name already taken'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'Fields can not be left empty and/or quantity must be a number'
      }
    },
    navRecipe() {
      this.$router.push({ name: 'recipes' })
    },
    formValidation() {
      return !(this.form.name.trim().length === 0 || !this.isArrayNotEmpty(this.form.ingredients))
    },
    numberInputValidation() {
      for (const ingredient of this.form.ingredients) {
        if (isNaN(Number(ingredient.quantity))) {
          return false
        }
      }
      return true
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
    }
  },
  created() {
    this.setExistingIngredient()
  }
}

</script>
