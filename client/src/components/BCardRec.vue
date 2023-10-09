<!-- This card is BCard but without buttons, will be used as a component in other pages -->
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
    }
  }
}
</script>

<template>
  <b-card class="mx-auto my-12" max-width="374">
    <!-- Header slot -->
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <div>{{ displayData.name }}</div>
      </div>
    </template>
    <template #default>
      <b-row v-for="(field, name) in displayData" :key="name" align-h="center">
        <!-- Array slot -->
        <b-col v-if="Array.isArray(field)">
          <b-list-group v-for="(entry, index) in field" :key="index" >
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

</style>
