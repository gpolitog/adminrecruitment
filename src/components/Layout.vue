<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        Internship Admin Panel
      </q-toolbar-title>
      <p>
        Logged in as {{form.name}}
      </p>
    </div>

    <q-tabs slot="navigation">
     <q-tab icon="view_day" route="/application" >Application</q-tab>
     <q-tab icon="view_day" route="/meeting" >Meeting Schedule</q-tab>
     <q-tab icon="view_day" route="/calldrop1" >Calldrop status 1</q-tab>
     <q-tab icon="view_day" route="/calldrop2" >Calldrop status 2</q-tab>
     <q-tab icon="view_day" route="/selected" >Selected</q-tab>
     <q-tab icon="view_day" route="/waiting" >Waiting List</q-tab>
     <q-tab icon="view_day" route="/rejected" >Rejected</q-tab>
     <q-tab icon="view_day" route="/fake" >fake profile</q-tab>
     <q-tab icon="view_day" route="/terminated" >Terminated</q-tab>
     <q-tab icon="view_day" route="/all" >All</q-tab>
    </q-tabs>

    <q-modal ref="layoutModal" noBackdropDismiss noEscDismiss :content-css="{minWidth: '20vw', minHeight: '45vh'}">
      <q-layout>
        <div slot="header" class="toolbar">
          <q-toolbar-title :padding="1">
            Login
          </q-toolbar-title>
        </div>
        <div class="layout-view">
          <div class>
            <!--
            <q-tabs slot="navigation" class="inverted orange">
              <q-tab icon="view_day" @selected="val='1'">Sign Up</q-tab>
              <q-tab icon="view_day" @selected="val='2'">Login In</q-tab>
            </q-tabs>
            <br /><br />
            <div v-if="val === '1'">
              <div class="floating-label">
                <input @input="$v.form.name.$touch()" :class="{'has-error': $v.form.name.$error}" required v-model="form.name" />
                <label>Name</label>
              </div>
              <div class="floating-label">
                <input @input="$v.form.email.$touch()" :class="{'has-error': $v.form.email.$error}" required v-model="form.email" />
                <label>Login ID</label>
              </div>
              <br /><br />
              <div class="floating-label">
                <input @input="$v.form.password.$touch()" :class="{'has-error': $v.form.password.$error}" required v-model="form.password" />
                <label>Password</label>
              </div>
              <br /><br />
              <pre>                        <button class="primary" @click="OnSigned()">Sign Up</button></pre>
            </div>
          -->
            <div style = "padding-top:0.5cm;padding-left:1cm" v-if="val === '2'">
              <div class="floating-label">
                <input @input="$v.form.email.$touch()" :class="{'has-error': $v.form.email.$error}" required v-model="form.email" />
                <label>Login ID</label>
              </div>
              <br /><br />
              <div class="floating-label">
                <input @input="$v.form.password.$touch()" :class="{'has-error': $v.form.password.$error}" required v-model="form.password" />
                <label>Password</label>
              </div>
              <pre>            <button class="primary" @click="OnLogged()">Login</button></pre>
            </div>
          </div>
        </div>
      </q-layout>
    </q-modal>

    <router-view class="layout-view"></router-view>

    <div slot="footer" class="toolbar">
      <div class="auto flex justify-center within-iframe-hide">
        <button v-go-back="'/'">
          <i class="on-left animate-blink">
            replay
          </i>
          Back to Home
        </button>
      </div>
      <q-toolbar-title :padding="0" class="within-iframe-only">
        Footer
      </q-toolbar-title>
    </div>
  </q-layout>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import {Dialog} from 'quasar'
export default {
  data () {
    return {
      val: '2',
      form: {
        name: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    /* OnSigned () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        Toast.create('Please review fields again.')
        return
      }
      var xyz = this
      axios.post('https://recruitmentserver.herokuapp.com/signin', {
        name: this.form.name,
        emailId: this.form.email,
        password: this.form.password
      })
      .then(function (response) {
        console.log(response)
        if (response.data === 'data not allowed') {
          Dialog.create({
            title: 'Alert',
            message: 'Login already exists'
          })
        }
        else {
          Dialog.create({
            title: 'Alert',
            message: 'Account created.Please login'
          })
          xyz.val = '2'
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }, */
    OnLogged () {
      var xyz = this
      axios.post('https://recruitmentserver.herokuapp.com/remember', {
        emailId: this.form.email,
        password: this.form.password
      })
      .then(function (response) {
        console.log(response)
        if (response.data === 'login unsuccessful') {
          Dialog.create({
            title: 'Alert',
            message: 'Login unsuccessful'
          })
          xyz.$refs.layoutModal.open()
        }
        else {
          xyz.$store.state.acl_current = response.data.permission
          xyz.form.name = response.data.name
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      this.$refs.layoutModal.close()
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(4) }
    }
  },
  mounted () {
    if (this.$store.state.acl_current !== 'admin' || this.$store.state.acl_current !== 'any') {
      this.$refs.layoutModal.open()
    }
  }
}
</script>
