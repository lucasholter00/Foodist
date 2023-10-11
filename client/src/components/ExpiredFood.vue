<template>
<div>
    <b-row>
        <b-col v-for="(food,index) in foods" :key="index" cols="12" md="4">
        <BCardRec class="highlightCard food" :class="[food.reminder ? 'reminder' : 'ok','food', food.expired ? 'expired' : 'ok']"
        :displayData="food"
        />
        </b-col>
    </b-row>
</div>
</template>
<script>
import BCardRec from './BCardRec.vue'

export default {
  name: 'FoodList',
  props: {
    currentUser: String,
    foods: Array
  },
  components: {
    BCardRec
  },
  emits: ['showDeleteModal', 'editEvent']
}
</script>
<style scope>

.food {
background: #cff5d4;
cursor: pointer;
}

.food.ok {
border-left: 10px solid green;
border-right: 10px solid green;
}

.food.reminder {
border-left: 10px solid rgb(233, 206, 53);
border-right: 10px solid rgb(233, 206, 53);
}

.food.expired {
border-left: 10px solid red;
border-right: 10px solid red;
}

</style>
