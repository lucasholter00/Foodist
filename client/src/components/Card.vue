<template>
  <div>
    <b-container v-for="(field, name) in displayData" :key="name">
      <div v-if="!Array.isArray(field)">
        <component v-if="name!=='_id'" :is="name==='name' ? 'h2' : 'p'">{{field}}</component>
      </div>
      <div v-else>
        <h4>{{capitalizeFirst(name)}}:</h4>
        <p v-for="(entry, index) in field" :key="index">{{entry}}</p>
      </div>
    </b-container>
    <b-row align-h="center">
      <b-button variant="danger" @click="removeCurrent">Remove</b-button>
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
    }
  }
}
</script>
