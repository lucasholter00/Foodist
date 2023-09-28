<script setup>
// import { Api } from '@/Api'; add back when user logic gets merged
import { reactive } from 'vue'

const form = reactive({
  name: '',
  ingredients: [{ name: '', quantity: '', measure: '' }],
  description: '',
  errorMessage: ''
})

const addIngredient = () => {
  form.ingredients.push({ name: '', quantity: '', measure: '' })
}

const removeIngredient = (index) => {
  form.ingredients.splice(index, 1)
}

const onsubmit = (event) => {
  event.preventDefault()
  // Implement submission logic here, need to get the user logic from branch 18
}

</script>

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
                :id="'measure-input-' + index"
                placeholder="Measure"
                v-model="ingredient.measure"
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
      </b-form>
    </b-row>
    <!-- Button to Add Ingredients to recipe -->
    <b-button type="button" variant="primary" @click="addIngredient">Add Ingredient</b-button>
    <!-- Submit recipe Button -->
    <b-button type="submit" variant="primary">Submit Recipe!</b-button>
  </div>
</template>

<style scoped>

</style>
