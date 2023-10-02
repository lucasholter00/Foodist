<template>
  <div>
    <b-container fluid>
      <b-form @submit="onSubmit">
        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label :for="foodName">Food Name:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            :id="foodName"
            v-model="form.foodName"
            placeholder="Enter food name">
          </b-form-input>
          </b-col>
        </b-row>

        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label :for="foodDescription">Food Description:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            :id="foodDescription"
            v-model="form.foodDescription"
            placeholder="Enter food description">
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
            type='date'>
            </b-form-input>
          </b-col>
        </b-row>
        <button type="submit" variant="success">Add Food</button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'AddFood',
  props: {
    currentUser: String
  },
  data() {
    return {
      types: [
        'date'
      ],
      form: {
        foodName: '',
        foodDescription: '',
        expiryDate: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      Api.post('/v1/users/' + this.currentUser + '/fooditems',
        this.form, { Headers: { 'Content-Type': 'application/json' } })
        .then(Response => {
          if (Response.status === 200) {
            this.form.foodName = ''
            this.form.foodDescription = ''
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

</style>
