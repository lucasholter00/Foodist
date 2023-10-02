<template>
  <div>
    <b-container fluid class="container">
      <b-form @submit="onSubmit">
        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label :for="foodName">Food Name:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            :id="foodName"
            v-model="form.foodName"
            placeholder="Enter food name">
          </b-form-input>
          </b-col>
        </b-row>

        <b-row class = "my-1" align-h="center" align-v="center">
          <b-col sm="2">
            <label :for="foodDescription">Food Description:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
            :id="foodDescription"
            v-model="form.foodDescription"
            placeholder="Enter food description">
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
        <button class= 'btn' type="submit" variant="success">Add Food</button>
      </b-form>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'AddFood',
  props: {
    currentUser: String
  },
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

      if (!this.text) {
        alert('Please add a food')
        return
      }
      const newFood = {
        foodName: this.foodName,
        foodDescription: this.foodDescription,
        expiryDate: this.expiryDate
      }

      this.$emit('add-food', newFood)
      this.foodName = ''
      this.foodDescription = ''
      this.expiryDate = ''
    }
  }
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
