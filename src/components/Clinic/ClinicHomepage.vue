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

    <div id="sideNavBar">
      <!--router-link to="/DoctorsList">Doctors</router-link-->
      <h4>Doctors</h4>
      <!--router-link to="/ClinicSettings"-->
      <h4>Settings</h4>
      <!--/router-link-->
    </div>
    <button @click="signOut" class="button is-primary">
      <strong>Logout</strong>
    </button>
    <br />
    <div v-if="isUserAuth" id="monthlyPatient">
      <mp></mp>
    </div>
    <div v-if="isUserAuth" id="rating">
      <ratingchart></ratingchart>
    </div>
    <div v-if="isUserAuth" id="monthlyRev">
      <linechart></linechart>
    </div>
  </div>
</template>

<script>
import MonthlyRev from "./MonthlyRev.js";
import ratingchart from "./ratingchart";
import MonthlyPatient from "./MonthlyPatients.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "clinichome",
  props: {
    msg: String,
  },
  components: { linechart: MonthlyRev, ratingchart, mp: MonthlyPatient },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
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

#monthlyRev,
#rating {
  height: 300px;
  width: 300px;
  border-style: solid;
  border-color: rgb(0, 114, 180);
  border-width: 1px;
  padding: 30px;
  margin: 10px;
  float: left;
}

#monthlyPatient {
  height: 750px;
  width: 750px;
  border-style: solid;
  border-color: rgb(0, 114, 180);
  border-width: 1px;
  padding: 30px;
  margin: 10px;
  display: inline-block;
  float: left;
}
/*#rating {
  height: 240px;
  width: 300px;
  border-color: rgb(0, 114, 180);
  padding-bottom: 60px;
  padding-right: 100px;
}*/

#sideNavBar {
  width: 100px;
  float: left;
  height: 1000px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgb(0, 114, 180);
  color: white;
}
</style>
