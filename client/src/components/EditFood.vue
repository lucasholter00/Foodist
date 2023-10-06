<template>
    <div>
      <b-container fluid class="container">
        <b-form  @submit="onSubmit">
          <b-row class = "my-1" align-h="center" align-v="center">
            <b-col sm="2">
              <label for="foodName">Food Name:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
              id="foodName"
              v-model="form.foodName"
              placeholder="Food name required"
              type="text"
              >
            </b-form-input>
            </b-col>
          </b-row>

          <b-row class = "my-1" align-h="center" align-v="center">
            <b-col sm="2">
              <label for="foodDescription">Food Description:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
              id="foodDescription"
              v-model="form.foodDescription"
              placeholder="Enter food description"
              type="text"
              >
            </b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1" align-h="center" align-v="center">
            <b-col sm="2">
              <label for="expiryDate">Expiry Date:</label>
            </b-col>
            <b-col sm="4">
              <b-form-input
              id="expiryDate"
              v-model="form.expiryDate"
              placeholder="Food description required"
              type='date'
              >
              </b-form-input>
            </b-col>
          </b-row>
          <b-button class= 'btn' type="submit" variant="success">Save</b-button>
        </b-form>
        <Card v-show= false @editEvent="fillExistingForm" :card="card"/>
      </b-container>
    </div>
  </template>

<script>
import Card from './Card.vue'
export default {
  name: 'EditFood',
  props: {
    currentUser: {
      type: String
    },
    name: String,
    description: String,
    expiryDate: Date,
    existingFood: {}
  },
  components: {
    Card
  },
  data() {
    return {
      form: {
        foodName: this.name || '',
        foodDescription: this.description || '',
        expiryDate: this.expiryDate || ''
      }
    }
  },
  // created() {
  //   if (this.existingFood) {
  //     this.form.foodName = this.existingFood.name
  //     this.form.foodDescription = this.existingFood.description
  //     this.form.expiryDate = this.existingFood.expiryDate
  //   }
  // },
  methods: {
    // fillExistingForm(existingFood) {
    //   this.form.foodName = existingFood.name
    //   this.form.foodDescription = existingFood.description
    //   this.form.expiryDate = existingFood.expiryDate
    //   this.$emit('editEvent', existingFood)
    // },
    onSubmit(e) {
      e.preventDefault()

      const newFood = {
        name: this.form.foodName,
        description: this.form.foodDescription,
        expiryDate: this.form.expiryDate
      }

      this.$emit('edit-food', newFood)
      this.form.foodName = ''
      this.form.foodDescription = ''
      this.form.expiryDate = ''
      this.$emit('close-edit')
    }
  },
  emits: ['editEvent']
}
</script>

  <style scoped>
  .container {
    max-width: 1000px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }

  .btn {
    display: inline-block;
    background: green;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }

  .btn:focus {
    outline: none;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn-block {
    display: block;
    width: 100%;
  }
  </style>
