<template>
    <div>
      <div v-for="food in foods"
    :key="food.id">
      <Food
        @delete-food="$emit('delete-food', food.id)"
      :food="food"/>
    </div>
  </div>
</template>

<script>
import Food from './Food.vue'

export default {
  name: 'Foods',
  props: {
    foods: Array
  },
  components: {
    Food
  },
  emits: ['delete-food']
}
</script>
