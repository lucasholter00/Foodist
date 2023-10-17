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
            v-for="(groceries, index) in form.groceries"
            class="p-3"
            :key="index"
            :id="'grocery' + index"
            :label="'Grocery ' + (index+1) + ':'"
            label-size="lg"
            label-align="left"
          >
            <b-form-input
              v-model="form.groceries[index]"
              :id="'grocery' + index"
              placeholder="Enter grocery name"
              type="groceryName"
            >
            </b-form-input>
            <b-row align-h="center">
              <a class="removeButton" @click="removeField(index)">Remove</a>
            </b-row>
            <b-row align-h="center">
              <b-button v-if="index === (form.groceries.length-1)" class="mt-5 grayText rounded-circle" type="field" variant="light" size="sm" @click="addField">+</b-button>
            </b-row>
          </b-form-group>
          <b-row allign-h="center" class="p-4">
            <b-button class="w-100" type="Submit" variant="success">Create</b-button>
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
    }
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
      this.form.name = this.form.name.trim()
      this.message = ''
      this.errorMessage = ''
      event.preventDefault()
      if (this.formValidation()) {
        console.log(this.currentUser)
        Api.post('/v1/users/' + this.currentUser + '/grocery-lists', this.form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 201) {
              this.form.groceries = ['']
              this.form.name = ''
              this.message = 'Grocery list added'
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 404) {
                this.errorMessage = 'User not found'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'Fields can not be left empty'
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

  }
}
</script>

<style>
  .errorMessage{
    color: red;
    font-size: 14px;
  }
  .message{
    color: green;
    font-size: 14px;
  }
  .grayText{
    color: rgb(128, 128, 128) !important;
  }

</style>
