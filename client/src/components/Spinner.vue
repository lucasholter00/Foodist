<template>
    <b-spinner
      variant="success" class="align-content-center"
    ></b-spinner>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style scoped>

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
