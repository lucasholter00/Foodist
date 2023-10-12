<template>
<div>
    <b-row>
        <b-col v-for="(food,index) in expired" :key="index" cols="12" md="4">
        <BCardRec class="highlightCard food" :class="[food.reminder ? 'reminder' : 'ok','food', food.expired ? 'expired' : 'ok']"
        :displayData="food"
        />
        </b-col>
    </b-row>
    <b-row>
        <b-col v-for="(food,index) in shortlyExpired" :key="index" cols="12" md="4">
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
  name: 'ExpiryFood',
  props: {
    currentUser: String
  },
  components: {
    BCardRec
  },
  data() {
    return {
      foods: [],
      expired: [],
      shortlyExpired: []
    }
  },
  // methods: {
  //   getFood() {
  //     Api.get('/v1/users/' + this.currentUser + '/food-items')
  //       .then((res) => {
  //         if (res.status === 200) {
  //           console.log('Result ' + res.data)

  //           this.foods = this.checkExpiryDates(res.data)
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response.status === 404) {
  //           this.errorMessage = 'Not found'
  //         } else {
  //           this.errorMessage = 'Server error'
  //         }
  //       })
  //   },
  //   checkExpiryDates(foods) {
  //     foods.forEach(food => {
  //       const exprDate = new Date(food.expiryDate)
  //       const timeDifference = exprDate - new Date()
  //       if (timeDifference < 0) {
  //         food.expired = true
  //         this.expired.push(food)
  //       } else {
  //         // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
  //         const leftDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000))
  //         if (leftDays < 15) {
  //           food.reminder = true
  //           this.shortlyExpired.push(food)
  //         }
  //       }
  //     }
  //     )
  //     return foods
  //   }
  // },
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
