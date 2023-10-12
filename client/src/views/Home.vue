<template>
  <div class="border">
    <div>
      <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
        <b-button class="btn_message" variant="primary" v-on:click="getMessage()">Get Message from Server</b-button>
        <p>Message from the server:<br/>{{ message }}</p>
      </b-jumbotron>
    </div>
    <b-container fluid class="border">
      <b-col v-for="(food, index) in sortedFoods" :key="index" cols="12" md="4">
        <b-row>
          <soonExpireFood class="highlightCard" :displayData="food" />
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import soonExpireFoodHome from '@/components/SoonExpireFoodHome.vue'

export default {
  name: 'home',
  components: {
    SoonExpireFood: soonExpireFoodHome
  },
  props: {
    currentUser: {
      type: String
    }
  },
  data() {
    return {
      message: 'none',
      foods: [],
      sortedFoods: []
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    addFood() {
      return Api.get('/v1/users/' + this.currentUser + '/food-items')
        .then((res) => {
          if (res.status === 200) {
            console.log('Result ' + res.data)
            this.foods = res.data
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Not found'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    },
    soonExpiredFoods() {
      const today = new Date()
      const soonExpiredThreshold = 5 // Adjust this threshold as needed (e.g., 5 days)

      return this.foods
        .filter((food) => {
          const expirationDate = new Date(food.expiryDate)
          const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24))
          return daysUntilExpiration <= soonExpiredThreshold
        })
        .sort((a, b) => {
          const dateA = new Date(a.expiryDate)
          const dateB = new Date(b.expiryDate)
          return dateA - dateB
        })
    }
  },
  created() {
    this.getMessage()
    this.addFood().then(() => {
      this.sortedFoods = this.soonExpiredFoods()
    })
  }
}
</script>
