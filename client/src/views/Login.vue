<template>
  <div>
    <b-row align-h="center" align-v="center">
      <b-col cols="2">
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
          <b-button type="submit" variant="primary">Submit</b-button>

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
      currentUser: ''
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      Api.get('/v1/users/' + this.form.username)
        .then(response => {
          this.currentUser = response.data.userName
        })
    }
  }
}
</script>
