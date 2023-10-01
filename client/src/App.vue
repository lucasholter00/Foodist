<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Home </router-link>
      <router-link to="/groceryList"> Grocery List </router-link>
      <router-link to="/groceryList/create"> Create Grocery List </router-link>
      <router-link v-if="!currentUser" to="/login"> Login </router-link>
      <a v-else @click="logout">Log out</a>
    </div>

    <!-- Render the content of the current page view -->
    <router-view :currentUser="currentUser" @currentUserEvent="updateUser"/>
    <p>{{ currentUser }}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentUser: null
    }
  },
  methods: {
    updateUser(event) {
      console.log('Event received in parent component:', event)
      this.currentUser = event
      console.log(this.currentUser)
    },
    logout() {
      this.currentUser = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
