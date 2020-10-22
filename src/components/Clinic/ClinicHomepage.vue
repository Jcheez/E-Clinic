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
    </ul>
    <!--div>
      <p>Choose year</p>
      <select id="year">
        <option value="0">Year:</option>
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
        <option>2023</option>

      </select>
    </div-->
    <div id="chart">
      <ratingchart></ratingchart>
    </div>
  </div>
</template>

<script>
import ratingchart from './ratingchart'
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      selected: '',
    }
  },
  components: {
    ratingchart
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
