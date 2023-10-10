<template>
  <div>
    <!-- <p>{{ expiryFood }}</p> -->
    <div :key="food._id" v-for="food in expiryFood">
      <Food
        @delete-food="$emit('delete-food', food._id)"
        :food="food"/>
    </div>
  </div>
</template>
<script>
import Food from './Food.vue'

export default {
  name: 'ExpiryFood',
  props: {
    currentUser: String,
    foods: Array
  },
  components: {
    Food
  },
  data() {
    return {
      expiryFood: []
    }
  },
  watch: {
    foods(newArray, oldArray) {
      console.log('new array ' + newArray)
      console.log('old array ' + oldArray)
      for (let i = 0; i < oldArray.length; i++) {
        if (newArray[i] === oldArray[i]) {
          return
        } else {
          newArray.splice(i, 0, oldArray[i])
          // newArray[i].push(oldArray[i])
        }
      }
    }
  },
  created() {
    this.sortExpiryingFood()
  },
  methods: {
    sortExpiryingFood() {
      const expired = []
      this.foods.forEach(food => {
        const exprDate = new Date(food.expiryDate)
        const timeDifference = exprDate - new Date()
        if (timeDifference < 0) {
          expired.push(food)
        } else {
          // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
          const leftDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000))
          if (leftDays < 15) {
            this.expiryFood.push(food)
          }
        }
      })
    }
  },
  emits: ['delete-food']
}
</script>
