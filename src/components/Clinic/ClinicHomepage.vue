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

    <div id="chart">
      <linechart></linechart>
    </div>
  </div>
</template>

<script>
import ME from "./MonthlyEarnings.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: { linechart: ME },
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

#chart {
  height: 400px;
  width: 400px;
  border-style: solid;
  border-color: rgb(155, 84, 84);
  border-width: 1px;
  padding: 30px;
  float: left;
}
</style>
