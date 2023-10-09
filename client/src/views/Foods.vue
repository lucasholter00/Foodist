<template>
  <b-container>
 <div>
   <b-row align-h="end">
     <b-button
         pill
         class="mt-2 mb-2 mx-1 buttonStyle"
         :class="{redText: showAddFood}"
         @click="toggleAddFood"
         @keydown.enter.prevent
     >
       {{ showAddFood ? 'Close' : '+ Add Food' }}
     </b-button>
   </b-row>
    <div v-show="showAddFood">
      <AddFood @add-food="addFood"/>
    </div>
      <b-row class="border">
        <b-col class="border" v-for="(food,index) in foods" :key="index" cols="3">
          <BCard @showDeleteModal="showDeleteModal" @removeEvent="removeList" class="border" :displayData="food" />
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
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import AddFood from '../components/AddFood.vue'
import BCard from '../components/BCard.vue'

export default {
  name: 'Foods',
  props: {
    currentUser: String
  },
  components: {
    AddFood,
    BCard
  },
  data() {
    return {
      foods: [],
      showModal: false,
      showAddFood: false,
      errorMessage: '',
      message: ''
    }
  },
  created() {
    this.getFood()
  },
  methods: {
    toggleAddFood() {
      this.showAddFood = !this.showAddFood
    },
    addFood(food) {
      Api.post('/v1/users/' + this.currentUser + '/food-items',
        food, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          if (res.status === 200) {
            this.message = 'Food is added'
            this.getFood()
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Ooops! Food is not added.'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    },
    getFood() {
      Api.get('/v1/users/' + this.currentUser + '/food-items')
        .then((res) => {
          if (res.status === 200) {
            this.foods = res.data
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorMessage = 'Not found'
          } else {
            this.errorMessage = 'Server error'
          }
        })
    },
    removeList(event) {
      const food = this.foods.find((food) => food._id === event)
      Api.delete('/v1/users/' + this.currentUser + '/food-items/' + food.name)
        .then((res) => {
          this.foods = res.data.food
          this.getFood()
        })
    },
    showDeleteModal(item) {
      // Set the selected item and show the modal
      this.selectedItem = item
      this.showModal = true
    },
    confirmDelete() {
      this.removeList(this.selectedItem)
      this.hideModal()
    },
    cancelDelete() {
      // Handle cancel deletion logic here
      // Hide the modal without performing any deletion
      this.hideModal()
    },
    hideModal() {
      // Hide the modal and clear the selected item
      this.showModal = false
      this.selectedItem = null
    }
  }
}
</script>
<style scoped>
.buttonStyle {
  background-color: #80a28b !important;
  border: #80a28b !important;
}

.buttonStyle:hover {
  background-color: #80b095 !important;
  border: #80b095 !important;
}
  .redText{
    background-color: red !important;
  }
  .redText:hover{
    background-color: darkred !important;
  }
  .border {
    border: 0;
  }
</style>
