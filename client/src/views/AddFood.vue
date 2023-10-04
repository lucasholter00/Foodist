<template>
  <div>
    <b-container fluid class="container">
      <b-form @submit="onSubmit">
        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label for="name">Food Name:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Enter food name"
            type="text"
            aria-required="true">
          </b-form-input>
          </b-col>
        </b-row>

        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label for="description">Food Description:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            id="description"
            v-model="form.description"
            placeholder="Enter food description"
            type="text"
            aria-required="false">
          </b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label for="expiryDate">Expiry Date:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            id="expiryDate"
            v-model="form.expiryDate"
            type='date'
            aria-required="true">
            </b-form-input>
          </b-col>
        </b-row>
        <b-button class= 'btn' type="submit" variant="success">Add Food</b-button>
      </b-form>
      <p v-if="errorMessage">{{errorMessage}}</p>
      <p v-if="message">{{message}}</p>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'AddFood',
  props: {
    currentUser: {
      type: String
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        expiryDate: ''
      },
      errorMessage: '',
      message: ''
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      console.log(this.form)

      Api.post('/v1/users/' + this.currentUser + '/food-items',
        this.form, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          if (response.status === 200) {
            this.form.name = ''
            this.form.description = ''
            this.form.expiryDate = ''
            this.message = 'Food is added.'
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Ooops! Food is not added.'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: green;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

</style>
