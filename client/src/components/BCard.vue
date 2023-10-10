<script>
export default {
  name: 'Card',
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
    formatField(name, value) {
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
  <b-card class="shadow-lg custom-rounded-card" rounded max-width="374">
    <!-- Header slot -->
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <b-button class="editButton" variant="link" @click="emitEdit">Edit</b-button>
        </div>
        <p>{{ displayData.name }}</p>
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
    <template #default>
      <b-row v-for="(field, name) in displayData" :key="name" align-h="center">
        <!-- Array slot -->
        <b-col v-if="Array.isArray(field)">
          <b-list-group class="list-group-flush custom-list-item" v-for="(entry, index) in field" :key="index" >
            <b-list-group-item v-if="typeof entry ==='object'">
              <p v-if="name === 'ingredients'"><strong>{{ entry.name }}:</strong> {{ entry.quantity }} {{ entry.unit }}</p>
            </b-list-group-item>
            <!-- -->
            <b-list-group-item v-else>
              <p>{{entry}}</p>
            </b-list-group-item>

          </b-list-group>

        </b-col>
        <!-- Non array slot -->
        <b-col v-else>
          <b-card-text v-if="name !== 'name' && name !=='_id'">{{formatField(name, field)}}</b-card-text>
        </b-col>
      </b-row>
    </template>
  </b-card>
</template>

<style>
.editButton {
  color: grey !important;
  text-decoration: underline !important;
}

.editButton:hover {
  color: dimgrey !important;
}
.custom-rounded-card {
  border-radius: 20px !important;
  border: none;
  overflow: hidden;
}

.delete-button {
  background-color: transparent !important;
  border: none !important;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
}
</style>
