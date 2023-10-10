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
   <b-modal v-model="showModal" title="Confirm Delete" hide-footer>
     <div>
       <p>Are you sure you want to delete this food item?</p>
     </div>
     <b-row align-h="end" class="justify-content-around">
       <b-button variant="danger" @click="confirmDelete">Delete</b-button>
       <b-button variant="secondary" @click="cancelDelete">Cancel</b-button>
     </b-row>
   </b-modal>
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
