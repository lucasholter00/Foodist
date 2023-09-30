<template>
  <div>
    <b-container fluid>
      <b-form @submit="onSubmit">
        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label :for="foodname">Food Name:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input :id="foodName" v-model="form.foodname"  placeholder="Enter food name"></b-form-input>
          </b-col>
        </b-row>

        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label :for="foodDescription">Food Description:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input :id="foodDescription" v-model="form.foodDescription" placeholder="Enter food description"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1" align-h="center" align-v="center" v-for="type in types" :key="type">
          <b-col sm="2">
            <label :for="`type-${type}`">Expiry Date:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input :id="`type-${type}`" v-model="form.expiryDate" :type="type"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="Submit" variant="success">Save</b-button>
  </b-form>
  </b-container>
  <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      types: [
        'date'
      ],
      form: {
        foodname: '',
        foodDescription: '',
        expiryDate: ''
      }
    }
  },
  methods: {
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
        Api.post('/v1/users/username/fooditems')
      }
    }
  }
}
</script>
