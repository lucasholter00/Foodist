<template>
  <div id="app">
    <b-navbar toggleable="lg" sticky type="dark"  style="background-color: mediumseagreen">
      <b-navbar-brand to="/">
        <div class="d-flex align-items-center">
          <span class="cart-icon d-none d-lg-block d-xl-none">&#128722;</span>
          <span class="app-name"> Foodist - <span class="tagline">track your food</span></span>
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <template v-if="currentUser">
        <b-navbar-nav style="color: white">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/Foods" class="nav-link">Foods</router-link>
          <router-link to="/recipes" class="nav-link">Recipes</router-link>
          <router-link to="/groceryList" class="nav-link">Grocery List</router-link>
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
              <b-dropdown-item to="/FAQ">FAQ</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Render the content of the current page view -->
    <router-view :userLinks="userLinks" :currentUser="currentUser" @currentUserEvent="updateUser" :editObject="editObject" @editEvent="updateEditObject"/>
    <FooterComp/>
  </div>
</template>

<script>
import FooterComp from './components/FooterComp.vue'
import { Api } from '@/Api'

export default {
  data() {
    return {
      currentUser: '',
      editObject: null,
      userLinks: Object
    }
  },
  watch: {
    currentUser(newVal, oldVal) {
      if (this.currentUser === null) {
        this.directLogin()
      }
      if (newVal !== '' && newVal !== null) {
        Api.get('/v1/users/' + newVal)
          .then((response) => {
            this.userLinks = response.data.links
          })
          .catch((err) => {
            if (err.request) {
              this.$router.push('/error')
            }
            console.log(err)
          })
      }
    }
  },
  methods: {
    updateUser(event) {
      this.currentUser = event
    },
    updateEditObject(event) {
      if (this.editObject !== event) {
        this.editObject = event
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
  },
  components: { FooterComp }
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
.buttonStyle {
  background-color: #80a28b !important;
  border: #80a28b !important;
}

.buttonStyle:hover {
  background-color: #80b095 !important;
  border: #80b095 !important;
}
.custom-rounded-card {
  border-radius: 20px !important;
  border: none;
  overflow: hidden;
}
.fixedHeight {
  height: 300px !important;
}
.expandText {
  color: #7c8f7f !important;
  opacity: 0.9;
  text-decoration: underline !important;
}
.expandText:hover {
  cursor: pointer !important;
}

.custom-rounded-card {
  border-radius: 20px !important;
  border: none;
  overflow: hidden;
}
.highlightCard:hover{
  transform: scale(1.01) !important;
}
.exitCross {
  font-size: 20px !important;
  color: #e85656 !important;
}
.exitCross:hover{
  cursor: pointer !important;
}
.box{
  max-width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid #80b095 !important;
  padding: 30px;
  border-radius: 5px;
}
.errorMessage{
  color: red;
  font-size: 14px;
}
.message{
  color: green;
  font-size: 14px;
}
</style>
