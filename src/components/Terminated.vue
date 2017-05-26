<template>
  <div>
    <table style="margin-top: 30px;" class="q-table highlight striped-even">
      <thead>
        <tr>
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
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      items: []
    }
  },
  mounted () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
    var xyz = this
    axios.get('https://recruitmentserver.herokuapp.com/terminated')
      .then(function (response) {
        var r
        console.log(response)
        for (r in response.data) {
          // console.log(response.data[r].college)
          xyz.items.push(response.data[r])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>
