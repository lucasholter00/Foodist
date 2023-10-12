<template>
  <div>
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
    </b-jumbotron>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
   <p class="message" v-if="message">{{message}}</p>
    <b-row>
        <b-col cols="12" md="4" v-for="(food,index) in shortlyExpired" :key="index">
          <BCardRec class="highlightCard food" :class="[food.reminder ? 'reminder' : 'ok',
          'food', food.expired ? 'expired' : 'ok']"
          @closeCardModal="close" :displayData="food"/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import BCardRec from '../components/BCardRec.vue'

export default {
  name: 'home',
  props: {
    currentUser: String
  },
  data() {
    return {
      // foods: [],
      // expired: []
      shortlyExpired: [],
      errorMessage: '',
      message: ''
    }
  },
  components: {
    BCardRec
  },
  created() {
    this.getFood()
  },
  methods: {
    close() {

    },
    getFood() {
      Api.get('/v1/users/' + this.currentUser + '/food-items')
        .then((res) => {
          if (res.status === 200) {
            this.foods = this.checkExpiryDates(res.data)
          }
        })
        .catch((error) => {
          if (error.res.status === 404) {
            this.errorMessage = 'Not found'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    },
    checkExpiryDates(foods) {
      foods.forEach(food => {
        const exprDate = new Date(food.expiryDate)
        const timeDifference = exprDate - new Date()
        if (timeDifference < 0) {
          food.expired = true
          this.expired.push(food)
        } else {
          // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
          const leftDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000))
          if (leftDays < 15) {
            food.reminder = true
            this.shortlyExpired.push(food)
          }
        }
      }
      )
      return foods
    }
  }
}

</script>
