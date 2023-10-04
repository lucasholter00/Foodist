<template>
  <b-container>
    <b-row align-h="center">
      <b-button @click="$router.push({name:'Create grocery list'})" variant="primary">Add new list</b-button>
    </b-row>
    <b-row class="border">
      <b-col ckass="border" v-for="(entry, index) in groceryLists" :key="index" cols="3">
        <card @removeEvent="removeList" class="border" :displayData="entry" @editEvent="emitEdit"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Card from '../components/Card.vue'
import { Api } from '@/Api'

export default {
  name: 'GroceryLists',
  props: {
    currentUser: String
  },
  components: {
    card: Card
  },
  data() {
    return {
      errorMessage: '',
      groceryLists: []
    }
  },
  created() {
    Api.get('/v1/users/' + this.currentUser + '/grocery-lists')
      .then((res) => {
        if (res.status === 200) {
          this.groceryLists = res.data
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.errorMessage = 'User not found'
        } else {
          this.errorMessage = 'Server error'
        }
      })
  },
  methods: {
    removeList(event) {
      Api.delete('v1/users/' + this.currentUser + '/grocery-lists/' + event)
        .then((res) => {
          this.groceryLists = res.data.lists
        })
    },
    emitEdit(event) {
      const editList = this.groceryLists.find((list) => list._id === event)
      this.$emit('editEvent', editList)
      this.$router.push({ name: 'edit-groceryList' })
    }
  }

}

</script>
<style scoped>
  .border {
    border: 1px solid;
  }
</style>
