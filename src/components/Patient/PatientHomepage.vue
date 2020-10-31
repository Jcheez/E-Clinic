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
      <li>
        <router-link to="/managepayments">Go to Manage Payments</router-link>
      </li>
    </ul>
    <a @click="signOut" class="button is-primary">Logout</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
