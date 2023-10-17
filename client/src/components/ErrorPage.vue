<template>
  <div>
    <p>{{ errorMessage }}</p>
    <router-link to="/">Go back to the homepage</router-link>
    <!-- Add additional actions or links as needed -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: 'An error occurred. The server may be offline or unreachable.'
    }
  }
}
</script>
