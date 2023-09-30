<template>
  <div>
    <b-row align-h="center" align-v="center">
      <b-col cols="8" sm="4" lg="2">
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
          <b-row align-h="between">
            <b-button type="Submit" variant="primary">Submit</b-button>
            <router-link to="/register"><b-button type="Register" variant="primary" >Register</b-button></router-link>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>

// import { Api } from '@/Api'

export default {
  name: 'CreateGroceryList',
  data() {
  },
  methods: {
  }
}
</script>

<style>
  .errorMessage{
    color: red;
    font-size: 14px;
  }

</style>
