<template>
  <b-container>

    <b-row align-h="end">
      <b-button pill class="mt-2 mb-2 mx-1 buttonStyle" @click="$router.push({name:'Create grocery list'})" variant="primary">+ Add new grocery list</b-button>
    </b-row>

    <b-row>
      <b-col v-for="(entry, index) in groceryLists" :key="index" cols="12" md="4">
        <card @showDeleteModal="showDeleteModal" @modalEvent="cardModal(index)" @editEvent="emitEdit" :displayData="entry" class="mb-2 highlightCard"/>
      </b-col>
    </b-row>
    <spinner v-if="isLoading"></spinner>
    <b-modal hide-header hide-footer v-model="showCardModal" tall size="md" body-class="m-0 p-0" content-class="custom-rounded-card">
      <bcardrec @closeCardModal="closeCardModal" :displayData="groceryLists[cardDisplay]" />
    </b-modal>

    <b-modal v-model="showModal" title="Confirm Delete" hide-footer>
      <div>
        <p>Are you sure you want to delete this grocery list?</p>
      </div>
      <b-row align-h="end" class="justify-content-around">
        <b-button class="buttonStyle" @click="confirmDelete">Delete</b-button>
        <b-button variant="secondary" @click="cancelDelete">Cancel</b-button>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import BCard from '../components/BCard.vue'
import { Api } from '@/Api'
import BCardrec from '@/components/BCardRec.vue'
import spinner from '@/components/Spinner.vue'

export default {
  name: 'GroceryLists',
  props: {
    currentUser: String,
    userLinks: Object
  },
  components: {
    spinner,
    card: BCard,
    bcardrec: BCardrec

  },
  data() {
    return {
      errorMessage: '',
      groceryLists: [],
      showModal: false,
      showCardModal: false,
      cardDisplay: -1,
      isLoading: true
    }
  },
  created() {
    Api.get(this.userLinks.groceryLists.href)
      .then((res) => {
        if (res.status === 200) {
          this.groceryLists = res.data
          this.isLoading = false
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            this.errorMessage = 'Not found'
          }
        } else if (error.request) {
          this.$router.push('/error')
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
    cardModal(index) {
      this.showCardModal = true
      this.cardDisplay = index
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
    },
    closeCardModal() {
      this.showCardModal = false
    }
  }

}

</script>
<style scoped>
  .border {
    border: 1px solid;
  }
</style>
