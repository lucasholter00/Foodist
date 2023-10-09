<template>
  <div
    :class="[food.reminder ? 'reminder' : '', 'food']"
  >
    <h3>
      {{ food.name }}
      <i @click="$emit('delete-food', food.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ food.expiryDate }}</p>
  </div>
</template>

<script>
export default {
  name: 'Food',
  props: {
    food: Object
  }
}
</script>

<style scope>
.fas {
color: red;
}

.food {
background: #f4f4f4;
margin: 5px;
padding: 10px 20px;
cursor: pointer;
}

.food.reminder {
border-left: 5px solid green;
}

.food h3 {
display: flex;
align-items: center;
justify-content: space-between;
}
</style>
