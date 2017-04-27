<template>
  <div>
    <div style="width:60%;float:left;">
      <table style="margin-top: 30px;" class="q-table highlight striped-even">
        <thead>
          <tr>
            <th class="text-left"><pre></pre></th>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-right">Contact No</th>
            <th class="text-right">Email ID</th>
            <th class="text-right">Date</th>
            <th class="text-right">Time</th>
            <th class="text-right">Location</th>
            <th class="text-right">Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <q-checkbox v-model="checked[item.id]"></q-checkbox>
            <td data-th="ID" class="text-left" >{{item.id}}</td>
            <td data-th="Name" class="text-left" >{{item.name}}</td>
            <td data-th="Contact No" class="text-right" >{{item.contact_no}}</td>
            <td data-th="Email ID" class="text-right" >{{item.email_id}}</td>
            <td data-th="Date" class="text-right" >{{item.date}}.{{item.month}}.{{item.yr}}</td>
            <td data-th="Time" class="text-right" >{{item.hour}}:{{item.mins}}</td>
            <td data-th="Location" class="text-right" >{{item.location}}</td>
            <td data-th="Comments" class="text-right" >{{item.comments}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <q-modal ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-layout>
        <div slot="header" class="toolbar">
          <button @click="$refs.layoutModal.close()">
            <i>keyboard_arrow_left</i>
          </button>
          <q-toolbar-title :padding="1">
            Schedule Meeting
          </q-toolbar-title>
        </div>
        <div class="layout-view">
          <div class="layout-padding">
            <h5>Date and Time</h5>
            <br />
            <q-datetime v-model="datetime" type="datetime"></q-datetime>
            <br />
            <h5>Location</h5>
            <br />
            <q-select type="list" v-model="select" :options="selectOptions"></q-select>
            <br />
            <h5>Comments</h5>
            <br />
            <textarea v-model="comments" placeholder="Enter text here" style="width:100%"></textarea>
            <br />
            <pre>          </pre><button class="primary" @click="OnSubmitted()">Submit</button>
          </div>
        </div>
      </q-layout>
    </q-modal>
    <div style="float:left;width:40%;">
      <br /><br /><br /><br />
      <button class="primary" @click="OnSelected()">Selected</button>
      <br /><br />
      <button class="primary" @click="OnRejected()">Rejected</button>
      <br /><br />
      <button class="primary" @click="OnWaiting()">Waiting List</button>
      <br /><br />
      <button class="primary" @click="OnRescheduled()">Reschedule</button>
    </div>
  </div>
 </template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      datetime: '',
      comments: '',
      select: '',
      selectOptions: [
        {
          label: 'chennai',
          value: 'chennai'
        }
      ],
      checked: [],
      items: []
    }
  },
  methods: {
    OnSelected () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          axios.post('http://localhost:9000/changestatus', {
            id: i,
            status: 'selected'
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      }
    },
    OnRejected () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          axios.post('http://localhost:9000/changestatus', {
            id: i,
            status: 'rejected'
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      }
    },
    OnWaiting () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          axios.post('http://localhost:9000/changestatus', {
            id: i,
            status: 'waiting'
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      }
    },
    OnRescheduled () {
      this.$refs.layoutModal.open()
    },
    OnSubmitted () {
      this.$refs.layoutModal.close()
      var myDate = new Date(this.datetime)
      console.log(myDate)
      var tempDate = myDate.toString()
      var array = tempDate.split(' ')
      var time = array[4].split(':')
      console.log(time)
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          axios.post('http://localhost:9000/scheduled', {
            id: i,
            status: 'meeting',
            date: array[2],
            month: array[1],
            yr: array[3],
            hour: time[0],
            mins: time[1],
            location: this.select,
            comments: this.comments
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      }
    }
  },
  mounted () {
    var xyz = this
    axios.get('http://localhost:9000/meeting')
      .then(function (response) {
        var r
        console.log(response)
        xyz.count = response.data.length
        for (r in response.data) {
          // console.log(response.data[r].college)
        // xyz.count += 1
          xyz.items.push(response.data[r])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // console.log(xyz.count)
    for (var i = 0; i < 1000; i++) {
      xyz.checked.push(false)
    }
  }
}
</script>
