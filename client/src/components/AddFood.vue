<template>
  <div>
    <b-container fluid class="box shadow-lg" id="addFoodBox">
      <b-form @submit="onSubmit">
        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label for="foodName">Food Name:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            id="foodName"
            v-model="form.foodName"
            placeholder="Enter food name"
            type="text">
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
            type="text">
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
            type='date'>
            </b-form-input>
          </b-col>
        </b-row>
        <b-button pill class='buttonStyle' type="submit" variant="success">Save Food</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'AddFood',
  data() {
    return {
      form: {
        foodName: '',
        foodDescription: '',
        expiryDate: ''
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      if (this.validateExpiryDate() && this.validateForm()) {
        const newFood = {
          name: this.form.foodName,
          description: this.form.foodDescription,
          expiryDate: this.form.expiryDate
        }

        this.$emit('add-food', newFood)
        this.form.foodName = ''
        this.form.foodDescription = ''
        this.form.expiryDate = ''
      } else {
        if (!this.validateForm() && this.validateExpiryDate()) {
          alert('No fields can be left empty')
        } else if (!this.validateExpiryDate() && this.validateForm()) {
          alert('Not a valid expiry date, enter a date that is today or further in the future')
        } else {
          alert('No fields can be left empty and the expiry date is invalid')
        }
      }
    },
    validateExpiryDate() {
      const today = new Date().toISOString().split('T')[0] // Get today's date in 'yyyy-mm-dd' format
      return this.form.expiryDate >= today // Compare the expiryDate with today
    },
    validateForm() {
      // will validate only name and description, since there is a separate validator for expiry date
      return !(this.form.foodName.trim().length === 0 || this.form.foodDescription.trim().length === 0)
    }
  }
}
</script>

<style scoped>

#addFoodBox {
  background-color: rgba(255, 255, 255, 0.75) !important;
  border: none !important;
  border-radius: 20px;
}
</style>
