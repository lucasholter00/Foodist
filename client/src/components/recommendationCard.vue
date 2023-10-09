<template>
  <b-container class="fixed-dimensions-container">
    <b-row align-h="end" class="justify-content-between">
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
      } else if (name === 'ingredientMatches' && value) {
        return 'You have ' + value + ' ingredients in the kitchen!'
      } else {
        return value
      }
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
</style>
