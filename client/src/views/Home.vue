<template>
  <div class="jumbotron">
    <b-jumbotron header="Foodist" lead="Welcome to your foodist App">
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
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
