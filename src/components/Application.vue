<template>
  <div>
    <div style="float:left;">
      <pre>                                               <button class="primary" @click="OnScheduled()">Schedule Meeting</button>      <button class="primary" @click="OnCalled()">Call Again</button>     <button class="primary" @click="OnFaked()">Fake</button></pre>
    </div>
    <div style="float:left;">
      <table class="q-table highlight striped-even">
        <thead>
          <tr>
            <th class="text-left"><pre></pre></th>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-right">Contact No</th>
            <th class="text-right">Email ID</th>
            <th class="text-right"><q-select type="list" v-model="college" :options="collOptions" @input="OnColl()" label="College"></q-select></th>
            <th class="text-right"><q-select type="list" v-model="department" :options="deptOptions" @input="OnDept()" label="Department"></q-select></th>
            <th class="text-right"><q-select type="list" v-model="degree" :options="degOptions" @input="OnDeg()" label="Degree"></q-select></th>
            <th class="text-right"><q-select type="list" v-model="district" :options="disOptions" @input="OnDis()" label="District"></q-select></th>
            <th class="text-right"><q-select type="list" v-model="year" :options="yrOptions" @input="OnYear()" label="Year"></q-select></th>
            <th class="text-right">Year of Joining</th>
            <th class="text-right">SOP</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in showeditems">
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
      </table>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { Utils, Dialog } from 'quasar'

export default {
  data () {
    return {
      datetime: '',
      year: '',
      comments: '',
      college: '',
      department: '',
      degree: '',
      select: '',
      district: '',
      yrOptions: [
        {
          label: 'Year',
          value: 'Year'
        },
        {
          label: 'First',
          value: '1'
        },
        {
          label: 'Second',
          value: '2'
        },
        {
          label: 'Third',
          value: '3'
        },
        {
          label: 'Fourth',
          value: '4'
        },
        {
          label: 'Fifth',
          value: '5'
        }
      ],
      disOptions: [
        {
          label: 'District',
          value: 'District'
        },
        {
          label: 'Chennai',
          value: 'Chennai'
        },
        {
          label: 'Kanchipuram',
          value: 'Kanchipuram'
        }
      ],
      degOptions: [
        {
          label: 'Degree',
          value: 'Degree'
        },
        {
          label: 'be/btech',
          value: 'be'
        },
        {
          label: 'arts',
          value: 'a&s'
        }
      ],
      deptOptions: [
        {
          label: 'Department',
          value: 'Department'
        },
        {
          label: 'cse',
          value: 'cse'
        },
        {
          label: 'it',
          value: 'it'
        }
      ],
      collOptions: [
        {
          label: 'College',
          value: 'College'
        },
        {
          label: 'ssn',
          value: 'ssn'
        },
        {
          label: 'vit',
          value: 'vit'
        }
      ],
      selectOptions: [
        {
          label: 'chennai',
          value: 'chennai'
        }
      ],
      checked: [],
      items: [],
      showeditems: []
    }
  },
  methods: {
    OnScheduled () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          break
        }
      }
      if (i === 1000) {
        Dialog.create({
          title: 'Alert',
          message: 'No rows were selected'
        })
      }
      else {
        this.$refs.layoutModal.open()
      }
    },
    OnColl () {
      if (this.college === 'College') {
        this.college = ''
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.items})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
      else {
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
    },
    OnDept () {
      if (this.department === 'Department') {
        this.department = ''
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
      else {
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
    },
    OnDeg () {
      if (this.degree === 'Degree') {
        this.degree = ''
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
      else {
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
    },
    OnDis () {
      if (this.district === 'District') {
        this.district = ''
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
      else {
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
    },
    OnYear () {
      if (this.year === 'Year') {
        this.year = ''
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
      }
      else {
        this.showeditems = Utils.filter(this.college, {field: 'college', list: this.items})
        this.showeditems = Utils.filter(this.department, {field: 'department', list: this.showeditems})
        this.showeditems = Utils.filter(this.degree, {field: 'degree', list: this.showeditems})
        this.showeditems = Utils.filter(this.district, {field: 'district', list: this.showeditems})
        this.showeditems = Utils.filter(this.year, {field: 'year', list: this.showeditems})
      }
    },
    OnFaked () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          break
        }
      }
      if (i === 1000) {
        Dialog.create({
          title: 'Alert',
          message: 'No rows were selected'
        })
      }
      else {
        for (i = 1; i < 1000; i++) {
          if (this.checked[i] === true) {
            axios.post('http://localhost:9000/changestatus', {
              id: i,
              status: 'fake'
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
    OnCalled () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          break
        }
      }
      if (i === 1000) {
        Dialog.create({
          title: 'Alert',
          message: 'No rows were selected'
        })
      }
      else {
        for (i = 1; i < 1000; i++) {
          if (this.checked[i] === true) {
            axios.post('http://localhost:9000/changestatus', {
              id: i,
              status: 'calldrop1'
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
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
    var xyz = this
    axios.get('https://recruitmentserver.herokuapp.com/applied')
      .then(function (response) {
        var r
        console.log(response)
        xyz.count = response.data.length
        for (r in response.data) {
          // console.log(response.data[r].college)
        // xyz.count += 1
          xyz.items.push(response.data[r])
          xyz.showeditems.push(response.data[r])
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
