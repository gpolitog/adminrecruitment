<template>
  <div>
    <div style="width:80%;float:left;">
      <table style="margin-top: 30px;" class="q-table highlight striped-even">
        <thead>
          <tr>
            <th class="text-left"><pre></pre></th>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-right">Contact No</th>
            <th class="text-right">Email ID</th>
            <th class="text-right">College</th>
            <th class="text-right">Department</th>
            <th class="text-right">Degree</th>
            <th class="text-right">District</th>
            <th class="text-right">Year</th>
            <th class="text-right">Year of Joining</th>
            <th class="text-right">SOP</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <q-checkbox v-model="checked[item.id]"></q-checkbox>
            <td data-th="ID" class="text-left" >{{item.id}}</td>
            <td data-th="Name" class="text-left" >{{item.name}}</td>
            <td data-th="Contact No" class="text-right" >{{item.contact_no}}</td>
            <td data-th="Email ID" class="text-right" >{{item.email_id}}</td>
            <td data-th="College" class="text-right" >{{item.college}}</td>
            <td data-th="Department" class="text-right" >{{item.department}}</td>
            <td data-th="Degree" class="text-right" >{{item.degree}}</td>
            <td data-th="District" class="text-right" >{{item.district}}</td>
            <td data-th="Year" class="text-right" >{{item.year}}</td>
            <td data-th="Year Of Joining" class="text-right" >{{item.year_of_joining}}</td>
            <td data-th="SOP" class="text-right" >{{item.sop}}</td>
            <td data-th="Status" class="text-right" >{{item.status}}</td>
          </tr>
        </tbody>
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
                <q-select type="list" v-model="location" :options="selectOptions"></q-select>
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
      </table>
    </div>
    <div style="float:left;width:20%;">
      <br /><br /><br />
      <br /><br /><br />
      <button class="primary" @click="OnScheduled()">Schedule Meeting</button>
      <br /><br />
      <button class="primary" @click="OnCalled()">Call Again</button>
      <br /><br />
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
      location: '',
      selectOptions: [],
      checked: [],
      items: []
    }
  },
  methods: {
    OnScheduled () {
      this.$refs.layoutModal.open()
    },
    OnCalled () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          axios.post('https://recruitmentserver.herokuapp.com/changestatus', {
            id: i,
            status: 'calldrop2'
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
          axios.post('https://recruitmentserver.herokuapp.com/scheduled', {
            id: i,
            status: 'meeting',
            date: array[2],
            month: array[1],
            yr: array[3],
            hour: time[0],
            mins: time[1],
            location: this.location,
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
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
    var xyz = this
    axios.get('https://recruitmentserver.herokuapp.com/calldrop1')
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
