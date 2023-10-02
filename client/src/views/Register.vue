<template>
  <div>
    <b-row align-h="center" align-v="center">
      <b-col cols="8" sm="4" lg="2">
        <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
        <p class="message" v-if="message">{{message}}</p>
        <b-form @submit="onSubmit">
          <b-form-group
            id="username"
            label="Username"
            label-for="input-1"
          >
            <b-form-input
              id="input1"
              placeholder="Enter username"
              v-model="form.userName"
              type="username"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="password"
            label="Password"
            label-for="input-2"
          >
            <b-form-input
              id="input2"
              placeholder="Enter password"
              v-model="form.password"
              type="password"
            >
            </b-form-input>
          </b-form-group>
          <b-row align-h="center">
            <b-button type="Submit" variant="primary">Sign up</b-button>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'register',
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      message: '',
      errorMessage: ''
    }
  },
  methods: {
    onSubmit(event) {
      this.message = ''
      event.preventDefault()
      Api.post('/v1/users', this.form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 201) {
            this.message = 'User created'
            this.form.userName = ''
            this.form.password = ''
            this.message = 'User created'
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            this.errorMessage = 'Username taken'
          } else {
            this.errorMessage = 'Server error'
          }
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

</style>
