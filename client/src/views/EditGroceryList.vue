<template>
  <div>
    <b-row align-h="center" align-v="center">
      <b-col cols="8" sm="4" lg="2">
        <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
        <p class="message" v-if="message">{{message}}</p>

        <b-form @submit="onSubmit">
          <b-form-group
            id="listName"
            label="Grocery List"
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
            :key="index"
            :id="'grocery' + index"
            :label="'Grocery ' + (index+1)"
          >
            <b-form-input
              :id="'grocery' + index"
              placeholder="Enter grocery name"
              type="groceryName"
              v-model="form.groceries[index]"
            >
            </b-form-input>
            <b-row align-h="center">
              <a @click="removeField(index)">Remove</a>
            </b-row>
            <b-row align-h="center">
              <b-button v-if="index === (form.groceries.length-1)" type="field" variant="outline-primary" @click="addField">Add field</b-button>
            </b-row>
          </b-form-group>
          <b-row align-h="between">
            <b-button type="Submit" variant="primary">Submit</b-button>
            <b-button @click="reset" variant="danger">Reset</b-button>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </div>
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
      this.form.name = this.form.name.trim()
      event.preventDefault()
      console.log(this.currentUser)
      const editId = this.editObject._id
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
    }
  },
  created() {
    this.reset()
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

</style>
