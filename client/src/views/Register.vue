<template>
  <b-container fluid class="p-5">
    <b-row align-h="center" align-v="center">
      <b-col cols="10" sm="8" md="6" lg="3" class="bg-white roundContainer shadow-lg">
        <b-form @submit="onSubmit">
          <h1 class="p-3">Registration</h1>
          <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
          <p class="message" v-if="message">{{message}}</p>

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
          <b-row align-h="center" class="p-4">
            <b-button type="Submit" pill class="w-100" :disabled="isNavigating" variant="success">Sign up</b-button>
          </b-row>
          <b-row align-h="center">
            <p>Already have an account? <router-link to="/login">Log in</router-link></p>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </b-container>

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
      errorMessage: '',
      isNavigating: false
    }
  },
  methods: {
    onSubmit(event) {
      this.message = ''
      event.preventDefault()
      this.navigate()
      if (this.formValidation()) {
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
              this.$router.push({ name: 'login' })
            }
          })
          .catch((error) => {
            this.navigate()
            if (error.response) {
              if ((error.response.status === 409)) {
                this.errorMessage = 'Username taken'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      }
    },
    formValidation() {
      if (this.form.userName.trim().length === 0 || this.form.password.trim().length === 0) {
        this.navigate()
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
