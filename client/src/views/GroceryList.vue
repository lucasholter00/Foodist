<template>
  <b-container>
    <b-row class="border">
      <b-col ckass="border" v-for="(entry, index) in groceryLists" :key="index" cols="3">
        <card class="border" :displayData="entry" />
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
    console.log('Här i created')
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
  }

}

</script>
<style scoped>
  .border {
    border: 1px solid;
  }
</style>
