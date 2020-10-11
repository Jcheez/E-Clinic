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
        <router-link to="/appointment">Go to Appointment Page</router-link>
      </li>
      <li>
        <router-link to="/CreateSlot" exact
          >+ Add Slot (in Appointment Page)</router-link
        >
      </li>
      <li>
        <router-link to="/consultTile">Go to Consultation Slot</router-link>
      </li>
            <li>
        <router-link to="/scheduledAppt">Go to Scheduled Appt</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
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
