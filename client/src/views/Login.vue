<template>
  <div style="border: 2px solid;">
    <b-row align-h="center" align-v="center" style="border: 2px solid;">
      <b-col cols="8" sm="4" lg="2" style="border:1px solid">
        <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
        <b-form @submit="onSubmit">
          <b-form-group
            id="username"
            label="Username"
            label-for="input-1"
          >
            <b-form-input
              id="input1"
              placeholder="Enter username"
              v-model="form.username"
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
          <b-row align-h="between" style="border:1px solid">
            <b-button type="Submit" variant="primary">Submit</b-button>
            <b-button type="Register" variant="primary">Register</b-button>
          </b-row>

          <p>{{form.username}}</p>
          <p>{{form.password}}</p>
          <p>Logged in user: {{currentUser}}</p>

        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'login',
  data() {
    return {
      message: 'welcome to the login page',
      form: {
        username: '',
        password: ''
      },
      currentUser: '',
      errorMessage: ''
    }
  },
  methods: {
    onSubmit(event) {
      this.errorMessage = ''
      event.preventDefault()
      Api.get('/v1/users/' + this.form.username)
        .then(response => {
          if (response.status === 200) {
            this.currentUser = response.data.userName
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Username or Password not correct'
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

</style>
