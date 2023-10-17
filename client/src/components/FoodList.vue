<template>
  <div>
    <b-row>
        <b-col v-for="(food,index) in foods" :key="index" cols="12" md="4" class="mb-2">
          <BCard class="highlightCard food" :class="[food.reminder ? 'reminder' : 'ok','food', food.expired ? 'expired' : 'ok']"
          :displayData="food"
          @showDeleteModal="$emit('showDeleteModal', food._id)"
          @editEvent="$emit('editEvent', food._id)"
          @modalEvent="$emit('modalEvent',index)"
          />
        </b-col>
      </b-row>
  </div>
</template>
<script>
import BCard from './BCard.vue'

export default {
  name: 'FoodList',
  props: {
    currentUser: String,
    foods: Array
  },
  components: {
    BCard
  },
  emits: ['showDeleteModal', 'editEvent']
}
</script>
<style scoped>

.food {
background: #ffffff;
cursor: pointer;
}

.food.ok {
border-left: 10px solid rgba(0, 128, 0, 0.43);
border-right: 10px solid rgba(0, 128, 0, 0.43);
}

.food.reminder {
    border-left: 10px solid rgba(233, 206, 53, 0.6);
    border-right: 10px solid rgba(233, 206, 53, 0.6);
}

.food.expired {
  border-left: 10px solid rgba(162, 22, 22, 0.27);
  border-right: 10px solid rgba(162, 22, 22, 0.27);
}

</style>
