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
              placeholder="Food name required"
              v-model="form.name"
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
              v-model="form.description"
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
              placeholder="Food description required"
              v-model="form.expiryDate"
              type='date'
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-button class='buttonStyle' pill type="submit" variant="success">Save</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'EditFood',
  props: {
    currentUser: {
      type: String
    },
    editObject: {}
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        expiryDate: ''
      }
    }
  },
  watch: {
    editObject(newVal, oldVal) {
      this.form = JSON.parse(JSON.stringify(newVal))
      this.form.expiryDate = this.form.expiryDate.split('T')[0]
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      const foodName = this.editObject.name
      const newFood = {
        name: this.form.name,
        description: this.form.description,
        expiryDate: this.form.expiryDate
      }
      if (this.validateInput()) {
        this.$emit('edit-food', foodName, newFood)
        this.form.name = ''
        this.form.description = ''
        this.form.expiryDate = ''
      } else {
        alert('Name cannot be empty and expiry date must be today or further in the future!')
      }
    },
    validateInput() {
      return !(this.form.name.trim().length === 0 || !this.validateExpiryDate())
    },
    validateExpiryDate() {
      const today = new Date().toISOString().split('T')[0] // Get today's date in 'yyyy-mm-dd' format
      return this.form.expiryDate >= today // Compare the expiryDate with today
    }
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.editObject))
    this.form.expiryDate = this.form.expiryDate.split('T')[0]
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
