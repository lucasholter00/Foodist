<template>
  <div>
    <b-row>
        <b-col v-for="(food,index) in foods" :key="index" cols="12" md="4">
          <BCard :class="[food.reminder ? 'reminder' : '', 'food', food.expired ? 'expired' : '']"
          :displayData="food"
          @showDeleteModal="$emit('showDeleteModal', itemId)"
          @editEvent="$emit('editEvent', eventData)"
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
<style scope>
.fas {
color: red;
}

.food {
background: #cff5d4;
margin: 5px;
padding: 10px 20px;
cursor: pointer;
border: 2px solid mediumseagreen;
}

.food.reminder {
border-left: 10px solid green;
border-right: 10px solid green;
}

.food.expired {
border-left: 10px solid red;
border-right: 10px solid red;
}

.food h3 {
display: flex;
align-items: center;
justify-content: space-between;
}
</style>
