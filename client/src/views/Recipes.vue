<template>
  <b-container>
    <b-row align-h="end">
      <b-button pill class="mt-2 mb-2 mx-1 buttonStyle" @click="$router.push({ name: 'create-recipe' })" variant="primary">
        <span class="plus-sign">+</span> Add Recipe
      </b-button>
    </b-row>
    <b-row class="border">
      <b-col v-for="(recipe, index) in recipes" :key="index" cols="12" md="4">
        <div class="card-wrapper">
          <bcard @showDeleteModal="showDeleteModal" @editEvent="editRecipe" class="border" :displayData="recipe" />
        </div>
      </b-col>
    </b-row>

    <b-modal v-model="showCardModal" scrollable size="md">
      <bcardrec :displayData="recipes[2]" />
    </b-modal>

    <b-modal v-model="showModal" title="Confirm Delete" hide-footer>
      <div>
        <p>Are you sure you want to delete this recipe?</p>
      </div>
      <b-row align-h="end" class="justify-content-around">
        <b-button variant="danger" @click="confirmDelete">Delete</b-button>
        <b-button variant="secondary" @click="cancelDelete">Cancel</b-button>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import BCard from '@/components/BCard.vue'
import BCardrec from '@/components/BCardRec.vue'

export default {
  name: 'recipes',
  props: {
    currentUser: {
      type: String
    }
  },
  components: {
    bcard: BCard,
    bcardrec: BCardrec
  },
  data() {
    return {
      recipes: [],
      selectedRecipe: null,
      showModal: false, // To control the visibility of the modal
      selectedItem: null,
      errorMessage: '',
      showCardModal: true
    }
  },
  methods: {
    getRecipes() {
      const currentUser = this.currentUser
      Api.get('/v1/users/' + currentUser + '/recipes')
        .then((response) => {
          if (response.status === 200) {
            this.recipes = response.data
          }
        })
    },
    editRecipe(event) {
      const recipe = this.recipes.find((recipe) => recipe._id === event)
      this.$emit('editEvent', recipe)
      this.$router.push({ name: 'edit-recipe' })
    },
    removeList(event) {
      const recipe = this.recipes.find((recipe) => recipe._id === event)
      Api.delete('v1/users/' + this.currentUser + '/recipes/' + recipe.name)
        .then((res) => {
          this.recipes = res.data.recipes
        })
    },
    showDeleteModal(item) {
      // Set the selected item and show the modal
      this.selectedItem = item
      this.showModal = true
    },
    cardModal() {
      this.showCardModal = true
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
  },
  created() {
    this.getRecipes()
  }
}
</script>

<style>
.buttonStyle {
  background-color: #80a28b !important;
  border: #80a28b !important;
}

.buttonStyle:hover {
  background-color: #80b095 !important;
  border: #80b095 !important;
}
.border {
}
</style>
