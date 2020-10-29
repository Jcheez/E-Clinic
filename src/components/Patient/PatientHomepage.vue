<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>

      <li>
        <router-link to="/makebooking">Go to Make Booking</router-link>
      </li>
      <li>
        <router-link to="/pending">See Pending Booking</router-link>
      </li>
      <li>
        <router-link to="/viewdocuments">View Documents</router-link>
      </li>
      <li>
        <router-link to="/viewappt">View Appointment</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "patientHome",
  props: {
    msg: String,
  },
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
</style>
