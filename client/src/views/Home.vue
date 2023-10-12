<template>
  <div class="jumbotron">
    <b-jumbotron header="Foodist" lead="Welcome to your foodist App">
    </b-jumbotron>
  <div>
    <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
    <p class="message" v-if="message">{{message}}</p>
  </div>
  <div class="container">
    <h2 style="color: mediumseagreen">Expired Food</h2>
    <div class="block">
    <b-row>
        <b-col cols="12" md="4" v-for="(food,index) in expired" :key="index">
          <BCardRec class="highlightCard expired"
          @closeCardModal="close" :displayData="food"/>
        </b-col>
      </b-row>
    </div>
  </div>
  <div class="container">
    <h2 style="color: mediumseagreen" >Shortly Expired Food</h2>
    <div class="block">
    <b-row>
        <b-col cols="12" md="4" v-for="(food,index) in shortlyExpired" :key="index">
          <BCardRec class="highlightCard shortlyExpired"
          @closeCardModal="close" :displayData="food"/>
        </b-col>
      </b-row>
    </div>
  </div>
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
      foods: [],
      expired: [],
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
          console.log(error)
          if (error.response.status === 404) {
            console.log('Testing error' + error.response.status)
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

<style scoped>

.container {
  max-width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 3px solid #80b095 !important;
  padding: 30px;
  border-radius: 5px;
}

.block {
  border-top: 3px solid #80b095;
  padding: 30px;
}
.expired {
border-left: 10px solid red;
border-right: 10px solid red;
}

.shortlyExpired {
border-left: 10px solid rgb(233, 206, 53);
border-right: 10px solid rgb(233, 206, 53);
}
</style>
<style>
.jumbotron {
  background-image:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("../assets/Banner.jpg");
  background-size: cover;
  color: mintcream
}
</style>
