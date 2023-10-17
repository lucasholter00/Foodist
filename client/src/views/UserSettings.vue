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
      newInputPassword: '',
      deleteOperationPassword: '',
      changePasswordModal: false,
      deleteAccountModal: false,
      deleteAllAccountsModal: false,
      deleteAllPassword: '',
      resetAccountModal: false,
      resetPassword: ''
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
          }
        }).catch((error) => {
          if (error.response) {
            if ((error.response.status === 404)) {
              this.errorMessage = 'Not found'
            }
          } else if (error.request) {
            this.$router.push('/error')
          } else {
            this.errorMessage = 'Server error'
          }
        }
        )
    },
    deleteAllAccounts() {
      if (this.deleteAllPassword === 'Admin123') {
        Api.delete('v1/users')
          .then((res) => {
            if (res.status === 200) {
              this.$emit('currentUserEvent', '')
              this.errorMessage = ''
              this.$router.push({ name: 'login' })
            }
          })
          .catch((error) => {
            if (error.response) {
              if ((error.response.status === 404)) {
                this.errorMessage = 'Not found'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      }
    },
    resetAccount() {
      const newUser = {
        userName: this.currentUser,
        password: this.resetPassword,
        groceryList: [],
        recipte: [],
        food: []
      }
      Api.put('v1/users/' + this.currentUser, newUser)
        .then((res) => {
          if (res.status === 200) {
            this.errorMessage = ''
            this.$emit('currentUserEvent', '')
            this.$router.push({ name: 'login' })
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.errorMessage = 'User not found'
            console.log(err)
          } else {
            this.errorMessage = 'Could not reset account'
            console.log(err)
          }
        })
    },
    verifyReset() {
      const verifyForm = {
        userName: this.currentUser,
        password: this.resetPassword
      }
      if (this.resetPassword !== '') {
        this.errorMessage = ''
        Api.post('/v1/users/authentication', verifyForm, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.resetAccount()
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
        this.errorMessage = 'Something went wrong'
      }
    },
    verifyPassword() {
      const verifyForm = {
        userName: this.currentUser,
        password: this.deleteOperationPassword
      }
      if (this.deleteOperationPassword !== '') {
        this.form.password = this.deleteOperationPassword
        this.errorMessage = ''
        Api.post('/v1/users/authentication', verifyForm, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.deleteAccount()
            }
          })
          .catch((error) => {
            console.log('error')
            if (error.response) {
              if ((error.response.status === 404) || (error.response.status === 401)) {
                this.errorMessage = 'Password incorrect'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'Something went wrong'
      }
    },
    editPassword() {
      this.form.newPassword = this.newInputPassword

      Api.patch('v1/users/' + this.currentUser, this.form, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          this.errorMessage = ''
          this.$router.push({ name: 'home' })
        }
      }).catch((error) => {
        if (error.response) {
          if ((error.response.status === 404)) {
            this.errorMessage = 'Not found'
          }
        } else if (error.request) {
          this.$router.push('/error')
        } else {
          this.errorMessage = 'Server error'
        }
      })
    },
    savePassword() {
      if (this.inputValidator()) {
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
            if (error.response) {
              if ((error.response.status === 404) || (error.response.status === 401)) {
                this.errorMessage = 'Username or Password incorrect'
              }
            } else if (error.request) {
              this.$router.push('/error')
            } else {
              this.errorMessage = 'Server error'
            }
          })
      } else {
        this.errorMessage = 'Password fields can not be empty!'
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
    },
    openDeleteAccountModal() {
      this.deleteAccountModal = true
    },
    openResetModal() {
      this.resetAccountModal = true
    },
    closeDeleteAccountModal() {
      this.deleteAccountModal = false
    },
    openDeleteAllModal() {
      this.deleteAllAccountsModal = true
    },
    closeDeleteAllModal() {
      this.deleteAllAccountsModal = false
    },
    closeResetModal() {
      this.resetAccountModal = false
    },
    inputValidator() {
      return !(this.oldPassword.trim().length === 0 || this.newInputPassword.trim().length === 0)
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
      <b-card @click="openDeleteAccountModal" class="text-center mx-2 mt-3" style="cursor: pointer; max-width: 18rem;">
        <span style="font-size: 48px;">&#128465;</span> <!-- Unicode for trash can icon -->
        <b-card-text class="mt-2">Delete My Account</b-card-text>
      </b-card>
      <b-card @click="openResetModal" class="text-center mx-2 mt-3" style="cursor: pointer; max-width: 18rem;">
        <span style="font-size: 48px;">&#8634;</span> <!-- Unicode for trash can icon -->
        <b-card-text class="mt-2">Reset My Account</b-card-text>
      </b-card>
      <b-card @click="openDeleteAllModal" class="text-center mx-2 mt-3" style="cursor: pointer; max-width: 18rem;">
        <span style="font-size: 48px;">&#9888;</span> <!-- Unicode for trash can icon -->
        <b-card-text class="mt-2">Delete All Accounts</b-card-text>
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
            <b-form-input v-model="newInputPassword" type="password"></b-form-input>
          </b-form-group>
        </div>
        <b-row align-h="end" class="justify-content-around">
          <b-button pill class="buttonStyle" variant="primary" @click="savePassword">Save Password</b-button>
          <b-button pill variant="secondary" @click="closeChangePasswordModal">Cancel</b-button>
        </b-row>
      </b-modal>
    </div>

    <div>
      <b-modal v-model="deleteAccountModal" title="Delete account?" hide-footer @hidden="closeDeleteAccountModal">
        <p v-if="errorMessage" class="text-danger">{{errorMessage}}</p>
        <b-form-group label="Enter password: ">
          <b-form-input v-model="deleteOperationPassword" type="password"></b-form-input>
        </b-form-group>
        <p>Are you sure that you want to delete your account?</p>
        <b-row align-h="end" class="justify-content-around">
          <b-button pill class="buttonStyle" variant="primary" @click="verifyPassword">Delete account!</b-button>
          <b-button pill variant="secondary" @click="closeDeleteAccountModal">Cancel</b-button>
        </b-row>
      </b-modal>
    </div>

        <div>
      <b-modal v-model="resetAccountModal" title="Reset your account?" hide-footer @hidden="closeResetModal">
        <p v-if="errorMessage" class="text-danger">{{errorMessage}}</p>
        <b-form-group label="Enter password">
          <b-form-input v-model="resetPassword" type="password"></b-form-input>
        </b-form-group>
        <p>Are you sure you want to reset your account?</p>
        <b-row align-h="end" class="justify-content-around">
          <b-button pill class="buttonStyle" variant="primary" @click="verifyReset">Reset account</b-button>
          <b-button pill variant="secondary" @click="closeResetModal">Cancel</b-button>
        </b-row>
      </b-modal>
    </div>

    <div>
      <b-modal v-model="deleteAllAccountsModal" title="Delete all accounts?" hide-footer @hidden="closeDeleteAllModal">
        <p v-if="errorMessage" class="text-danger">{{errorMessage}}</p>
        <b-form-group label="Enter admin password: ">
          <b-form-input v-model="deleteAllPassword" type="password"></b-form-input>
        </b-form-group>
        <p>Are you sure that you want to delete all accounts?</p>
        <b-row align-h="end" class="justify-content-around">
          <b-button pill class="buttonStyle" variant="primary" @click="deleteAllAccounts">Delete all accounts!</b-button>
          <b-button pill variant="secondary" @click="closeDeleteAllModal">Cancel</b-button>
        </b-row>
      </b-modal>
    </div>

  </div>
</template>
