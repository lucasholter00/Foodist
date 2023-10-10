<template>
  <b-container>
    <b-row align-h="end">
      <b-button pill class="mt-2 mb-2 mx-1 buttonStyle" @click="$router.push({name:'Create grocery list'})" variant="primary">+ Add new grocery list</b-button>

    </b-row>
    <b-row class="border">
      <b-col class="border" v-for="(entry, index) in groceryLists" :key="index" cols="12" md="4">
        <card @showDeleteModal="showDeleteModal" @editEvent="emitEdit" class="border" :displayData="entry"/>
      </b-col>
    </b-row>
    <b-modal v-model="showModal" title="Confirm Delete" hide-footer>
      <div>
        <p>Are you sure you want to delete this grocery list?</p>
      </div>
      <b-row align-h="end" class="justify-content-around">
        <b-button variant="danger" @click="confirmDelete">Delete</b-button>
        <b-button variant="secondary" @click="cancelDelete">Cancel</b-button>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import BCard from '../components/BCard.vue'
import { Api } from '@/Api'
export default {
  name: 'GroceryLists',
  props: {
    currentUser: String
  },
  components: {
    card: BCard
  },
  data() {
    return {
      errorMessage: '',
      groceryLists: [],
      showModal: false
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
    emitEdit(event) {
      const editList = this.groceryLists.find((list) => list._id === event)
      this.$emit('editEvent', editList)
      this.$router.push({ name: 'edit-groceryList' })
    },
    removeList(event) {
      Api.delete('v1/users/' + this.currentUser + '/grocery-lists/' + event)
        .then((res) => {
          this.groceryLists = res.data.lists
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
  .border {
    border: 1px solid;
  }
</style>
