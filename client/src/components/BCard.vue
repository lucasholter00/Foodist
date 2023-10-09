<script>
export default {
  name: 'VCard',
  props: {
    displayData: []
  },
  data() {
    return {}
  },
  methods: {
    capitalizeFirst(toBeCapitalized) {
      return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1)
    },
    formatField(value, name) {
      if (name === 'expiryDate' && value) {
        const date = new Date(value)
        const options = { day: 'numeric', month: 'short', year: 'numeric' }
        return 'Expiry date: ' + date.toLocaleDateString(undefined, options)
      } else {
        return value
      }
    },
    showDeleteModal(itemId) {
      // You can implement modal logic here or in the parent component
      // For now, you can emit an event to trigger modal display in the parent component
      this.$emit('showDeleteModal', itemId)
    },
    emitEdit() {
      const eventData = this.displayData._id
      this.$emit('editEvent', eventData)
    }
  }
}
</script>

<template>
  <b-card class="mx-auto my-12" max-width="374">
    <!-- Header slot -->
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <b-button class="editButton" variant="link" @click="emitEdit">Edit</b-button>
        </div>
        <div>{{ displayData.name }}</div>
        <div>
          <b-button
              class="delete-button"
              alt="Remove"
              @click="showDeleteModal(displayData._id)"
          >
            <span>&#128465;</span>
          </b-button>
        </div>
      </div>
    </template>
    <!-- Body slot -->
    <template #default>
      <div v-for="(ingredient, index) in displayData.ingredients" :key="index">
        <p>{{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}</p>
      </div>
      <p>{{ displayData.description }}</p>
    </template>
  </b-card>
</template>

<style scoped>

</style>
