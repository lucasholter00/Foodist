<template>
  <b-container fluid class="p-5">
    <b-row align-h="center">
      <b-col cols="10" md="6" lg="3" class="bg-white roundContainer shadow-lg">
        <b-form @submit="onSubmit">
          <h1 class="p-3">Login form</h1>
          <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
          <b-form-group
            class="p-3"
            id="username"
            label="Username:"
            label-size="lg"
            label-align="left"
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
            class="p-3"
            id="password"
            label="Password:"
            label-size="lg"
            label-align="left"
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
          <b-row class="p-4" align-h="between">
            <b-button class="w-100" type="Submit" pill :disabled="isNavigating" variant="success">Log in</b-button>
          </b-row>
          <b-row align-h="center">
            <p>Not a member? Register <router-link to="/register">here</router-link></p>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'login',
  data() {
    return {
      message: 'welcome to the login page',
      form: {
        userName: '',
        password: ''
      },
      currentUser: '',
      errorMessage: '',
      isNavigating: false
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.navigate()
      if (this.formValidation()) {
        this.errorMessage = ''
        Api.post('/v1/users/authentication', this.form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.currentUser = this.form.userName
              this.emitCurrentUser()
              this.$router.push({ name: 'home' })
            }
          })
          .catch((error) => {
            this.navigate()
            if (error.response) {
              if ((error.response.status === 404) || (error.response.status === 401)) {
                this.errorMessage = 'Username or Password incorrect'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'Username or password can not be empty'
      }
    },
    emitCurrentUser() {
      const eventData = this.currentUser
      this.$emit('currentUserEvent', eventData)
    },
    formValidation() {
      if (this.form.userName.trim().length === 0 || this.form.password.trim().length === 0) {
        this.errorMessage = 'Username or password can not be empty'
        return false
      } else {
        return true
      }
    },
    navigate() {
      this.isNavigating = !this.isNavigating
    }
  }
}
</script>
