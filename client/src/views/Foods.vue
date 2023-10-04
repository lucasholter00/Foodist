<template>
 <div>
    <AddFood @add-food="addFood"/>
      <b-row class="border">
        <b-col class="border" v-for="food in foods" :key=food.id cols="3">
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
  }
}
</script>
<style scoped>
  .border {
    border: 1px solid;
  }
</style>
