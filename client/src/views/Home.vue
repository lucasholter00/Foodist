<template>
  <div class="jumbotron">
    <b-jumbotron header="Foodist" lead="Welcome to your foodist App">
    </b-jumbotron>
    <spinner v-if="isLoading"></spinner>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import spinner from '@/components/Spinner.vue'

export default {
  name: 'home',
  components: { spinner },
  data() {
    return {
      message: 'none',
      isLoading: false // needs to be implemented when homePage is done, this should be true and set to false in a method!
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}

</script>
<style>
.jumbotron {
  background-image:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("../assets/Banner.jpg");
  background-size: cover;
  color: mintcream
}
</style>
