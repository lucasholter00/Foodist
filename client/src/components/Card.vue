<template>
  <b-container class="fixed-dimensions-container">
    <b-row align-h="end" class="justify-content-between">
      <b-col cols="6" cols-sm="6" cols-md="6" align-h="left">
        <b-button class="editButton" variant="link" @click="emitEdit">Edit</b-button>
      </b-col>
      <b-col cols="6" cols-sm="6" cols-md="6" align-h="right">
        <b-button
            class="delete-button"
            alt="Remove"
            @click="showDeleteModal(displayData._id)"
        >
          <span>&#128465;</span>
        </b-button>
      </b-col>
    </b-row>
    <b-container v-for="(field, name) in displayData" :key="name" align-h="center">
      <b-row v-if="!Array.isArray(field)">
        <b-col cols="12" align-h="center">
          <component v-if="name !== '_id'" :is="name === 'name' ? 'h1' : 'p'">
            {{ formatField(field, name) }}
          </component>
        </b-col>
      </b-row>
      <div v-else>
        <b-row align-h="center">
          <h3 class="w-100">{{ capitalizeFirst(name) }}</h3>
        </b-row>
        <div v-for="(entry, index) in field" :key="index">
          <b-row v-if="typeof entry !== 'object'" align-h="center">
            <p>{{ entry }}</p>
          </b-row>
          <b-row v-else>
            <b-col cols="4" align-h="center" v-for="(fields, name) in entry" :key="name">
              <div v-if="name !== '_id'">
                <p v-if="index === 0"> <strong>{{ name }}</strong> </p>
                <p>{{ formatField(fields, name) }}</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
    <b-row align-h="center">
    </b-row>
  </b-container>
</template>

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

<style>
.fixed-dimensions-container {
  min-height: 200px;
  max-height: 400px;
  min-width: 10%;
  max-width: 90%;
  overflow: auto !important;
}

.editButton {
  color: grey !important;
  text-decoration: underline !important;
}

.editButton:hover {
  color: dimgrey !important;
}

.delete-button {
  background-color: transparent !important;
  border: none !important;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
}

@media (max-width: 768px) {
  .delete-button {
    font-size: 18px;
    width: 18px;
    height: 18px;
  }
}

@media (min-width: 480px) {
  .delete-button {
    font-size: 16px;
    width: 16px;
    height: 16px;
  }
}
</style>
