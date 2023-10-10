<template>
  <div id="app">
    <b-navbar toggleable="lg" sticky type="dark"  style="background-color: mediumseagreen">
      <b-navbar-brand to="/">
        <span class="app-name">Foodist - <span class="tagline">track your food</span></span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <template v-if="currentUser">
        <b-navbar-nav style="color: white">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/Foods" class="nav-link">Foods</router-link>
          <router-link to="/recipes" class="nav-link">Recipes</router-link>
          <router-link to="/groceryList" class="nav-link">Grocery List</router-link>
          <router-link to="/recipes/recommendation" class="nav-link">Recipes rec</router-link>
        </b-navbar-nav>
        </template>
        <b-navbar-nav class="ml-auto">
          <template v-if="!currentUser">
            <router-link to="/login" class="nav-link">Login</router-link>
          </template>
          <template v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ currentUser }}</em>
              </template>
              <b-dropdown-item to="/user-settings">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Render the content of the current page view -->
    <router-view :currentUser="currentUser" @currentUserEvent="updateUser" :editObject="editObject" @editEvent="updateEditObject"/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentUser: '',
      editObject: null
    }
  },
  watch: {
    currentUser() {
      if (this.currentUser === null) {
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
.app-name {
  font-size: 24px; /* Adjust the size as needed */
  color: white;
  font-weight: bold; /* If you want it to be bold */
}

.tagline {
  font-size: 14px !important; /* Adjust the size as needed */
  color: white ;
  display: inline; /* Place the tagline on a new line */
}
.nav-link {
  color: white !important; /* Set link text color to white */
}
.nav-link:hover {
  text-decoration: underline !important; /* Remove underline on hover */
  color: lightgray; /* Change link color on hover */
}
body{
  background-color: #def7dc !important;
}
.roundContainer{
  border-radius: 10px !important;
  overflow: hidden !important;
}
.grayText{
  color: grey !important;
}
.removeButton{
  color: #acadac !important;
}
.removeButton:hover{
  color: #9fa19f !important;
}
.custom-rounded-card {
  border-radius: 20px !important;
  border: none;
  overflow: hidden;
}
</style>
