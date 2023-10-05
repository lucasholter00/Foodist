<template>
 <div>
  <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
    <p class="message" v-if="message">{{message}}</p>
    <div v-show= "showAddFood">
      <AddFood @add-food="addFood"/>
    </div>
    <div v-show="showEditFood">
      <EditFood @edit-food="editFood"/>
    </div>
      <b-row class="border">
        <b-col class="border" v-for="(food,index) in foods" :key="index" cols="3">
          <card  class="border" :displayData="food" @removeEvent="removeFood" @editEvent="handleEditFood"/>
        </b-col>
      </b-row>
  </div>
 </template>

<script>
import { Api } from '@/Api'
import AddFood from '../components/AddFood.vue'
import EditFood from '../components/EditFood.vue'
import Card from '../components/Card.vue'

export default {
  name: 'Foods',
  props: {
    currentUser: String,
    food: Object
  },
  components: {
    AddFood,
    EditFood,
    Card
  },
  data() {
    return {
      foods: [],
      showAddFood: false,
      showEditFood: false,
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
    handleEditFood(event) {
      const food = this.foods.find((food) => food._id === event)
      this.$emit('editEvent', food)
      this.toggleEditFood()
    },
    toggleEditFood() {
      this.showEditFood = true
    },
    editFood(food) {
      Api.put('/v1/users/' + this.currentUser + '/food-items/' + food.name,
        food, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          if (res.status === 200) {
            this.message = 'Food has been saved.'
            this.showEditFood = false
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
    removeFood(event) {
      const food = this.foods.find((food) => food._id === event)
      Api.delete('/v1/users/' + this.currentUser + '/food-items/' + food.name)
        .then((res) => {
          this.foods = res.data.food
          this.message = 'Food has been removed.'
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
