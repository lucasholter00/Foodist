<template>
 <AddFood/>

</template>

<script>

import AddFood from '../components/AddFood'

export default {
  name: 'Food',
  props: {
    currentUser: String
  },
  components: {
    AddFood
  },
  data() {
    return {
      foods: []
    }
  },
  methods: {
    async addFood(food) {
      const res = await fetch('/v1/users/' + this.currentUser + '/fooditems', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(food)
      })
      const data = await res.json()
      this.foods = [...this.foods, data]
    },
    async deleteFood(foodName) {
      if (confirm('Are you sure?')) {
        const res = await fetch('/v1/users/' + this.currentUser + `/fooditems/${foodName}`, {
          method: 'DELETE'
        })

        res.status === 200
          ? (this.foods = this.foods.filter((food) => food.name !== foodName))
          : alert('Error deleting food')
      }
    },
    async fetchFoods() {
      const res = await fetch('/v1/users/' + this.currentUser + '/fooditems')
      const data = await res.json()
      return data
    },
    async fetchFood(foodName) {
      const res = await fetch('/v1/users/' + this.currentUser + `/fooditems/${foodName}`)
      const data = await res.json()
      return data
    },
    async created() {
      this.foods = await this.fetchFoods()
    }
  }
}
</script>
