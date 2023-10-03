  <template>
    <b-container>
      <b-row align-h="center">
        <b-button @click="$router.push({name:'create-recipe'})" variant="primary">Add new recipe</b-button>
      </b-row>
      <b-row class="border">
        <b-col class="border" v-for="(recipe, index) in recipes" :key="index" cols="3">
          <card @removeEvent="removeList" @editEvent="editRecipe" class="border" :displayData="recipe" />
        </b-col>
      </b-row>
    </b-container>
  </template>

<script>
import { Api } from '@/Api'
import Card from '@/components/Card.vue'

export default {
  name: 'recipes',
  props: {
    currentUser: {
      type: String
    }
  },
  components: {
    card: Card
  },
  data() {
    return {
      recipes: [],
      selectedRecipe: null,
      errorMessage: ''
    }
  },
  methods: {
    getRecipes() {
      const currentUser = this.currentUser
      Api.get('/v1/users/' + currentUser + '/recipes')
        .then((response) => {
          if (response.status === 200) {
            this.recipes = response.data
          }
        })
    },
    editRecipe(event) {
      console.log('här')
      const recipe = this.recipes.find((recipe) => recipe._id === event)

      this.$emit('editEvent', recipe)
    },
    removeList(event) {
      const recipe = this.recipes.find((recipe) => recipe._id === event)
      console.log(recipe)
      Api.delete('v1/users/' + this.currentUser + '/recipes/' + recipe.name)
        .then((res) => {
          this.recipes = res.data.recipes
        })
    }
  },
  created() {
    this.getRecipes()
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
