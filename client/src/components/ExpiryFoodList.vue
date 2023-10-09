<template>
    <div>
      <p>{{ foods }}</p>
    </div>
</template>
<script>

export default {
  name: 'ExpiryFood',
  props: {
    currentUser: String,
    foods: Array
  },
  created() {
    // this.sortExpiryFood()
  },
  methods: {
    sortExpiryFood() {
      const expired = {}
      const expiryingFoodList = {}
      this.foods.forEach(food => {
        const timeDifference = food.expiryDate.getTime() - Date.now()
        if (timeDifference < 0) {
          expired.push(food)
        }
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
        const leftDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000))

        if (leftDays < 15) {
          expiryingFoodList.push(food)
        }
      })
      return expiryingFoodList
    }
  }
}
</script>
