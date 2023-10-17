<template>
  <b-container fluid class="p-5">
    <b-row align-h="center" align-v="center">
      <b-col cols="10" sm="8" md="6" lg="3" class="bg-white roundContainer shadow-lg">

        <b-form @submit="onSubmit">
          <h1 class="p-3">Grocery List</h1>
          <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
          <p class="message" v-if="message">{{message}}</p>

          <b-form-group
            class="p-3"
            id="listName"
            label="Grocery List:"
            label-size="lg"
            label-align="left"

          >
            <b-form-input
              id="input1"
              placeholder="Enter list name"
              type="listName"
              v-model="form.name"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            v-for="(grocery, index) in form.groceries"
            class="p-3"
            :key="index"
            :id="'grocery' + index"
            :label="'Grocery ' + (index+1)"
            label-size="lg"
            label-align="left"

          >
            <b-form-input
              :id="'grocery' + index"
              placeholder="Enter grocery name"
              type="groceryName"
              v-model="form.groceries[index]"
            >
            </b-form-input>
            <b-row align-h="center">
              <a @click="removeField(index)" class="removeButton">Remove</a>
            </b-row>
            <b-row align-h="center">
              <b-button v-if="index === (form.groceries.length-1)" class="mt-5 grayText rounded-circle" type="field" variant="light" size="sm" @click="addField">+</b-button>
            </b-row>
          </b-form-group>
          <b-row align-h="center" class="p-4">
            <b-button type="Submit" class="w-100" variant="success">Edit</b-button>
          </b-row>
          <b-row align-h="center" class="px-4 pb-4">
            <b-button @click="reset" class="w-100" variant="danger">Reset</b-button>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'CreateGroceryList',
  props: {
    currentUser: {
      type: String
    },
    editObject: {}
  },
  data() {
    return {
      errorMessage: '',
      message: '',
      form: {
        name: '',
        groceries: ['']
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.errorMessage = ''
      this.message = ''
      this.form.name = this.form.name.trim()
      event.preventDefault()
      console.log(this.currentUser)
      const editId = this.editObject._id
      if (this.formValidation()) {
        Api.put('/v1/users/' + this.currentUser + '/grocery-lists/' + editId, this.form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.message = 'Grocery list edited'
              this.$router.push({ name: 'Grocery list' })
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.errorMessage = 'Error, grocery list or user not found'
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'Fields can not be left empty and/or quantity must be a number'
      }
    },
    addField(event) {
      event.preventDefault()
      this.form.groceries.push('')
    },
    removeField(index) {
      if (this.form.groceries.length > 1) {
        this.form.groceries.splice(index, 1)
      } else {
        this.errorMessage = "Can't remove more groceries"
      }
    },
    reset() {
      this.form = JSON.parse(JSON.stringify(this.editObject))
    },
    formValidation() {
      return !(this.form.name.trim().length === 0 || !this.isArrayNotEmpty(this.form.groceries))
    },
    isArrayNotEmpty(arr) {
      if (!Array.isArray(arr)) {
        return false // Not an array
      }
      return arr.every((item) => {
        return !(typeof item !== 'string' || item.trim().length === 0)
      })
    }
  },
  created() {
    this.reset()
  }
}
</script>
