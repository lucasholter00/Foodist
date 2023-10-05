<template>
  <div>
    <b-container v-for="(field, name) in displayData" :key="name" align-h="center">
      <div v-if="!Array.isArray(field)">
        <component v-if="name!=='_id'" :is="name==='name' ? 'h1' : 'p'">{{field}}</component>
      </div>
      <div v-else>

        <h3>{{capitalizeFirst(name)}}</h3>
        <div v-for="(entry, index) in field" :key="index">
          <b-row  v-if="typeof entry !== 'object'">
            <p>{{entry}}</p>
           </b-row>
          <b-row v-else>
            <b-col v-for="(fields, name) in entry" :key="name">
              <div v-if="name !== '_id'">
                <p v-if="index === 0"> <strong>{{name}}</strong> {{ formatField(fields) }} </p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
    <b-row align-h="center">
      <b-button variant="danger" @click="removeCurrent">Remove</b-button>
      <b-button variant="danger" @click="emitEdit">Edit</b-button>
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
    capitalizeFirst(toBeCapitalized) {
      return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1)
    },
    removeCurrent() {
      const eventData = this.displayData._id
      this.$emit('removeEvent', eventData)
    },
    emitEdit() {
      const eventData = this.displayData._id
      this.$emit('editEvent', eventData)
    },
    formatField(fieldValue) {
      if (fieldValue instanceof Date) {
        // Format the Date field
        return fieldValue.toDateString()
      }
      return fieldValue
    }
  }
}
</script>
<style>

</style>
