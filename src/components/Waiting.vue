<template>
  <div>
    <div style="width:80%;float:left;">
      <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
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
      </table>
      <q-modal ref="layoutModal" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
        <q-layout>
          <div slot="header" class="toolbar">
            <button @click="$refs.layoutModal.close()">
              <i>keyboard_arrow_left</i>
            </button>
            <q-toolbar-title :padding="1">
              Change Status
            </q-toolbar-title>
          </div>
          <div class="layout-view">
            <div class="layout-padding">
              <label>
                <q-radio v-model="selected" val="true"></q-radio>
                Selected
              </label>
              <br /><br />
              <label>
                <q-radio v-model="selected" val="false"></q-radio>
                Rejected
              </label>
              <br /><Br /><Br /><br /><br /><br />
              <pre>            <button class="primary" @click="OnSubmitted()">Submit</button></pre>
            </div>
          </div>
        </q-layout>
      </q-modal>
    </div>
    <div style="float:left;width:20%;">
      <br /><br /><br />
      <br /><br /><br />
      <button class="primary" @click="OnSMS()">SMS</button>
      <br /><br />
      <button class="primary" @click="OnMAil()">Mail</button>
      <br /><br />
      <button class="primary" @click="OnVOIP()">VOIP</button>
      <br /><br />
      <button class="primary" @click="OnChangeStatus()">Change Status</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      reason: '',
      selected: false,
      items: [],
      checked: [],
      styles: [
        '',
        'bordered',
        'horizontal-delimiter',
        'vertical-delimiter',
        'cell-delimiter',
        'striped-odd',
        'striped-even',
        'highlight',
        'compact',
        'loose',
        'flipped'
      ],
      bordered: false,
      highlight: false,
      delimiter: 'none',
      stripe: 'none',
      type: 'none',
      gutter: 'none'
    }
  },
  computed: {
    computedClasses () {
      let classes = []
      if (this.bordered) {
        classes.push('bordered')
      }
      if (this.highlight) {
        classes.push('highlight')
      }
      if (this.delimiter !== 'none') {
        classes.push(this.delimiter + '-delimiter')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    }
  },
  methods: {
    OnSMS () {
    },
    OnMAil () {
    },
    OnVOIP () {
    },
    OnChangeStatus () {
      this.$refs.layoutModal.open()
    },
    OnSubmitted () {
      for (var i = 1; i < 1000; i++) {
        if (this.checked[i] === true) {
          if (this.selected === true) {
            axios.post('https://recruitmentserver.herokuapp.com/changestatus', {
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
          else {
            axios.post('https://recruitmentserver.herokuapp.com/changestatus', {
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
      }
      this.$refs.layoutModal.close()
    }
  },
  mounted () {
    var xyz = this
    axios.get('https://recruitmentserver.herokuapp.com/waiting')
      .then(function (response) {
        var r
        console.log(response)
        xyz.count = response.data.length
        for (r in response.data) {
          xyz.items.push(response.data[r])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    for (var i = 0; i < 1000; i++) {
      xyz.checked.push(false)
    }
  }
}
</script>
