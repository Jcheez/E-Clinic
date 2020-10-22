<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/pendingbooking">Go to Pending Booking</router-link>
      </li>
      <li>
        <router-link to="/patientsnotes">Go to Patient Notes</router-link>
      </li>
      <li>
        <router-link to="/appointment">Appointment Page</router-link>
      </li>
      <li>
        <router-link to="/doctorsettings">Doctor's Settings</router-link>
      </li>
      <li>
        <router-link to="/">Logout</router-link>
      </li>
    </ul>
    <div id="chart">
      <ratingchart></ratingchart>
    </div>
  </div>
</template>

<script>
import ratingchart from './ratingchart'
import firebase from "firebase"
export default {
  name: "clinichome",
  props: {
    msg: String,
  },
  data() {
    return {
    }
  },
  components: {
    ratingchart
  },
  
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#chart{
  height:240px;
  width:300px;
  border-color:rgb(155, 84, 84);
  padding-bottom: 60px;
  padding-right: 100px;
}
</style>
