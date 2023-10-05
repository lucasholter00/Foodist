<template>
  <div>
    <b-container v-for="(field, name) in displayData" :key="name" align-h="center">
      <b-row v-if="!Array.isArray(field)">
        <b-col cols="12" align-h="center">
          <component v-if="name!=='_id'" :is="name==='name' ? 'h1' : 'p'">{{field}}</component>
        </b-col>
      </b-row>
      <div v-else>
        <h3>{{capitalizeFirst(name)}}</h3>
        <div v-for="(entry, index) in field" :key="index">
          <b-row  v-if="typeof entry !== 'object'" align-h="center">
            <p>{{entry}}</p>
           </b-row>
          <b-row v-else>
            <b-col cols="4" align-h="center" v-for="(fields, name) in entry" :key="name">
              <div v-if="name !== '_id'">
                <p v-if="index === 0"> <strong>{{name}}</strong> </p>
                <p>{{fields}}</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
    <b-row align-h="center">
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    displayData: []
  },
  data() {
    return {
    }
  },
  methods: {
    setObjectType() {
      this.objectType = this.displayData.type
    },
    capitalizeFirst(toBeCapitalized) {
      return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1)
    },
    showDeleteModal() {
      this.$bvModal.show('deleteItemModal') // Show the modal
    },

    confirmDelete() {
      this.$bvModal.hide('deleteItemModal') // Hide the modal
      const eventData = this.displayData._id
      this.$emit('removeEvent', eventData)
    },

    cancelDelete() {
      this.$bvModal.hide('deleteItemModal') // Hide the modal without deleting
    },
    emitEdit() {
      const eventData = this.displayData._id
      this.$emit('editEvent', eventData)
    }
  },
  created() {
    this.setObjectType()
  }
}
</script>
<style>
</style>
