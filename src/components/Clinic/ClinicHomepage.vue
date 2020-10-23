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
    <button @click="signOut" class="button is-primary">
      <strong>Logout</strong>
    </button>
    <div v-if="isUserAuth" id="chart">
      <ratingchart></ratingchart>
    </div>
    <div id="monthlyRev">
      <linechart></linechart>
    </div>
  </div>
</template>

<script>

import MonthlyRev from "./MonthlyRev.js";
import ratingchart from './ratingchart'
import { mapGetters, mapActions } from "vuex";
export default {
  name: "clinichome",
  props: {
    msg: String,
  },
  components: { linechart: MonthlyRev, ratingchart },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"])
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push('/cliniclogin')
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

#monthlyRev {
  height: 400px;
  width: 400px;
  border-style: solid;
  border-color: rgb(155, 84, 84);
  border-width: 1px;
  padding: 30px;
  float: left;
}
#chart {
  height: 240px;
  width: 300px;
  border-color: rgb(155, 84, 84);
  padding-bottom: 60px;
  padding-right: 100px;
}
</style>
