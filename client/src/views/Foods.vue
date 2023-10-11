<template>
  <b-container>
 <div>
   <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
   <p class="message" v-if="message">{{message}}</p>
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
    <div v-show="showEditFood">
      <EditFood :editObject="editObject" @edit-food="editFood" />
    </div>
      <b-row>
        <b-col v-for="(food,index) in foods" :key="index" cols="12" md="4">
          <BCard @showDeleteModal="showDeleteModal" @removeEvent="removeFood" :displayData="food" @editEvent="handleEditFood"/>
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
import EditFood from '../components/EditFood.vue'

export default {
  name: 'Foods',
  props: {
    currentUser: String,
    editObject: {}
  },
  components: {
    AddFood,
    BCard,
    EditFood
  },
  data() {
    return {
      foods: [],
      showAddFood: false,
      showEditFood: false,
      showModal: false,
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
    handleEditFood(id) {
      const food = this.foods.find((food) => food._id === id)
      this.$emit('editEvent', food)
      this.toggleEditFood()
    },
    toggleEditFood() {
      this.showEditFood = !this.showEditFood
    },
    editFood(name, food) {
      Api.put('/v1/users/' + this.currentUser + '/food-items/' + name,
        food, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          if (res.status === 200) {
            this.message = 'Food has been saved.'
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
      this.toggleEditFood()
    },
    removeFood(event) {
      const food = this.foods.find((food) => food._id === event)
      Api.delete('/v1/users/' + this.currentUser + '/food-items/' + food.name)
        .then((res) => {
          this.foods = res.data.food
          this.message = 'Food has been removed.'
        })
    },
    showDeleteModal(item) {
      // Set the selected item and show the modal
      this.selectedItem = item
      this.showModal = true
    },
    confirmDelete() {
      this.removeFood(this.selectedItem)
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
  .redText{
    background-color: #a82a2a !important;
  }
  .redText:hover{
    background-color: #833131 !important;
  }
</style>
