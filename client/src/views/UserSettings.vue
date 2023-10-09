<script>
import { Api } from '@/Api'

export default {
  name: 'UserSettings',
  props: {
    currentUser: {
      type: String
    }
  },
  data() {
    return {
      form: {
        newPassword: ''
      },
      errorMessage: '',
      oldPassword: '',
      newerPassword: '',
      changePasswordModal: false
    }
  },
  methods: {
    deleteAccount() {
      console.log('Delete')
      Api.delete('v1/users/' + this.currentUser)
        .then((res) => {
          if (res.status === 200) {
            this.$emit('currentUserEvent', '')
            this.errorMessage = ''
            this.$router.push({ name: 'login' })
          } else if (res.status === 500) {
            this.errorMessage = 'Server error, please try again'
          } else {
            this.errorMessage = 'Something went wrong!'
          }
        })
    },
    editPassword() {
      this.form.newPassword = this.newerPassword

      Api.patch('v1/users/' + this.currentUser, this.form, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          this.errorMessage = ''
          this.$router.push({ name: 'home' })
        } else if (res.status === 500) {
          this.errorMessage = 'Server error, please try again'
        } else {
          this.errorMessage = 'Something went wrong!'
        }
      })
    },
    savePassword() {
      if (this.newerPassword !== '') {
        this.form.password = this.oldPassword
        this.errorMessage = ''
        Api.post('/v1/users/authentication', this.form, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.editPassword()
            }
          })
          .catch((error) => {
            console.log('error')
            if ((error.response.status === 404) || (error.response.status === 401)) {
              this.errorMessage = 'Password incorrect'
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'New password can not be empty!'
      }
    },
    openChangePasswordModal() {
      this.changePasswordModal = true
    },
    closeChangePasswordModal() {
      this.changePasswordModal = false
      // Clear input fields and error message when closing the modal
      this.oldPassword = ''
      this.newPassword = ''
      this.errorMessage = ''
    }
  },
  created() {
    this.form.userName = this.currentUser
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div>
      <b-card @click="openChangePasswordModal" class="text-center mx-2 mt-5" style="cursor: pointer; max-width: 18rem;">
        <span style="font-size: 48px;">&#9881;</span> <!-- Unicode for cogwheel icon -->
        <b-card-text class="mt-2">Change Password</b-card-text>
      </b-card>
      <b-card @click="deleteAccount" class="text-center mx-2 mt-3" style="cursor: pointer; max-width: 18rem;">
        <span style="font-size: 48px;">&#128465;</span> <!-- Unicode for trash can icon -->
        <b-card-text class="mt-2">Delete My Account</b-card-text>
      </b-card>
    </div>
    <div>
      <b-modal v-model="changePasswordModal" title="Change Password" hide-footer @hidden="closeChangePasswordModal">
        <div>
          <p v-if="errorMessage" class="text-danger">{{errorMessage}}</p>
          <b-form-group label="Old Password">
            <b-form-input v-model="oldPassword" type="password"></b-form-input>
          </b-form-group>
          <b-form-group label="New Password">
            <b-form-input v-model="newerPassword" type="password"></b-form-input>
          </b-form-group>
        </div>
        <b-row align-h="end" class="justify-content-around">
          <b-button variant="primary" @click="savePassword">Save Password</b-button>
          <b-button variant="secondary" @click="closeChangePasswordModal">Cancel</b-button>
        </b-row>
      </b-modal>
    </div>
  </div>

</template>

<style>

</style>
