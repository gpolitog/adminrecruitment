<template>
  <q-layout>
    <div id="formdiv">
      <div class="floating-label">
          <input v-model="district">
          <label>District</label>
      </div>
      <br />
      <div class="floating-label">
          <input v-model="college">
          <label>College</label>
      </div>
      <br />
      <div class="floating-label">
          <input v-model="degree">
          <label>Degree</label>
      </div>
      <div class="floating-label">
        <input v-model="department"></input>
        <label>Department</label>
      </div>
      <br /><br />
      <button class="primary" @click="SubmittedForm()">Submit</button>
    </div>
  </q-layout>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'quasar'
export default {
  data () {
    return {
      district: '',
      degree: '',
      college: '',
      department: ''
    }
  },
  methods: {
    SubmittedForm () {
      axios.post('https://recruitmentserver.herokuapp.com/collegelist', {
        college: this.college,
        degree: this.degree,
        district: this.district,
        department: this.department
      })
      .then(function (response) {
        console.log(response)
        if (response.data === 'data not allowed') {
          Dialog.create({
            title: 'Alert',
            message: 'Data already exists'
          })
        }
        else {
          Dialog.create({
            title: 'Alert',
            message: 'Details added to the list'
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style>
#formdiv {
  padding-left: 400px;
  padding-top: 10px;
},
#col1 {
  column-width: 100px;
}
</style>
