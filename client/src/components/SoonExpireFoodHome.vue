<!-- This card is BCard but without buttons, will be used as a component in other pages -->
<script>
export default {
  name: 'SoonExpireFoodHome',
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
    }

  }
}
</script>

<template>
  <b-list-group-item class="mx-auto mx-2 my-12" max-width="374">
    <!-- Header slot -->
    <template>
      <b-row align-h="center">
        <div class="mt-2 ml-2"><strong>{{ displayData.name }}</strong></div>
      </b-row>
    </template>
    <template>
      <b-row v-for="(field, name) in displayData" :key="name" align-h="center">
        <b-col>
          <b-card-text v-if=" name === 'expiryDate'">{{formatField(name, field)}}</b-card-text>
        </b-col>
      </b-row>
    </template>
  </b-list-group-item>
</template>

<style>

</style>
