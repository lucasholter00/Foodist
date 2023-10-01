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
      type: true,
      message: 'Hej'
    }
  },
  methods: {
    capitalizeFirst(toBeCapitalized) {
      return toBeCapitalized.charAt(0).toUpperCase() + toBeCapitalized.slice(1)
    }
  }
}
</script>
