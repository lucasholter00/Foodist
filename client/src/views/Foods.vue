<template>
 <div>
    <AddFood @add-food="addFood"/>
      <b-row class="border">
        <b-col class="border" v-for="(food,index) in foods" :key="index" cols="3">
          <card @removeEvent="removeList" class="border" :displayData="food" />
        </b-col>
      </b-row>
  </div>
 </template>

<script>
import { Api } from '@/Api'
import AddFood from '../components/AddFood.vue'
import Card from '../components/Card.vue'

export default {
  name: 'Foods',
  props: {
    currentUser: String
  },
  components: {
    AddFood,
    Card
  },
  data() {
    return {
      foods: [],
      errorMessage: '',
      message: ''
    }
  },
  created() {
    this.getFood()
  },
  methods: {
    addFood(food) {
      Api.post('/v1/users/' + this.currentUser + '/food-items',
        food, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          if (res.status === 200) {
            this.message = 'Food is added'
            this.getFood()
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Ooops! Food is not added.'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    },
    getFood() {
      Api.get('/v1/users/' + this.currentUser + '/food-items')
        .then((res) => {
          if (res.status === 200) {
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
    removeList(event) {
      const food = this.foods.find((food) => food._id === event)
      Api.delete('/v1/users/' + this.currentUser + '/food-items/' + food.name)
        .then((res) => {
          this.foods = res.data.food
          this.getFood()
        })
    }
  }
}
</script>
<style scoped>
  .border {
    border: 1px solid;
  }
</style>
