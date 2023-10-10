<template>
  <div>
    <div :key="food._id" v-for="food in foods">
      <Food
        @delete-food="$emit('delete-food', food._id)"
        :food="food"/>
    </div>
  </div>
</template>
<script>
import Food from './Food.vue'

export default {
  name: 'FoodList',
  props: {
    currentUser: String,
    foods: Array
  },
  components: {
    Food
  },
  emits: ['delete-food']
}
</script>
