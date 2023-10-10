<template>
  <div :class="[food.reminder ? 'reminder' : '', 'food', food.expired ? 'expired' : '']">
    <h3>
      {{ food.name }}
      <i @click="$emit('delete-food', food._id)" class="fas fa-times"></i>
    </h3>
    <p>{{ food.description }}</p>
    <p>{{ expiryDate() }}</p>
  </div>
</template>

<script>
export default {
  name: 'Food',
  props: {
    food: Object
  },
  methods: {
    expiryDate() {
      const date = new Date(this.food.expiryDate)
      const options = { day: 'numeric', month: 'short', year: 'numeric' }
      return 'Expiry date: ' + date.toLocaleDateString(undefined, options)
    }
  }
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
}

.food.expired {
  border-left: 10px solid red;
}

.food h3 {
display: flex;
align-items: center;
justify-content: space-between;
}
</style>
