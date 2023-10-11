<template>
  <div>
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
    </b-jumbotron>
    <b-row>
        <b-col cols="12" md="4">
          <ExpiredFood @emitClose="emitClose"/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ExpiredFood from '../components/ExpiredFood.vue'

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
  },
  components: { ExpiredFood }
}

</script>
