<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>

      <router-link to="/makebooking">Make A Booking</router-link>

      <router-link to="/pending">Pending Booking</router-link>

      <router-link to="/viewdocuments">View Documents</router-link>

      <router-link to="/viewappt">View Appointments</router-link>

      <router-link to="/managepayments">Manage Payments</router-link>

      <router-link to="/patientsettings">Settings</router-link>

      <a @click="signOut" class="button is-primary">Logout</a>
    </div>

    <notifications></notifications>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import notifications from "./notification component/notifications.vue";

export default {
  name: "patienthome",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/patientlogin");
    },
  },

  components: {
    notifications,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sideNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 50px 0 0 0;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  width: 90%;
}

#sideNavBar a:hover {
  font-size: 18px;
  color: white;
  cursor: pointer;
}

#sideNavBar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
  height: 100%;
}

h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
  margin: 40px 0 0;
}
</style>
