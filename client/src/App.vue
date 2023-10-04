<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/Foods">Foods</router-link>
      <router-link to="/recipes">Recipes</router-link>
      <router-link to="/groceryList"> Grocery List </router-link>
      <router-link v-if="!currentUser" to="/login"> Login </router-link>
      <a v-else @click="logout">Log out</a>
    </div>

    <!-- Render the content of the current page view -->
    <router-view :currentUser="currentUser" @currentUserEvent="updateUser" :editObject="editObject" @editEvent="updateEditObject"/>

    <p>{{ currentUser }}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentUser: null,
      editObject: null
    }
  },
  watch: {
    currentUser(currentUser) {
      if (this.currentUser === (null && '')) {
        this.directLogin()
      }
    }
  },
  methods: {
    updateUser(event) {
      console.log('Event received in parent component:', event)
      this.currentUser = event
      console.log(this.currentUser)
    },
    updateEditObject(event) {
      console.log('Event received in parent component:', event)
      if (this.editObject === event) {
        console.log('The same object are set again for edit!')
      } else {
        this.editObject = event
        console.log(this.editObject)
      }
    },
    logout() {
      this.currentUser = null
    },
    directLogin() {
      this.$router.push({ name: 'login' })
    }
  },
  created() {
    if (this.$route.name !== 'login') {
      this.$router.push({ name: 'login' })
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
