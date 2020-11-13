<template>
  <div>
    <h4>Pending Booking</h4>
    <div id="sideNavBar">
      <router-link to="/patienthome" id="clinic">E-Clinic</router-link>
      <router-link to="/makebooking">Make A Booking</router-link>
      <router-link to="/pending">Pending Booking</router-link>
      <router-link to="/viewdocuments">View Documents</router-link>
      <router-link to="/managepayments">Manage Payments</router-link>
      <router-link to="/patientsettings">Settings</router-link>
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <ul>
      <template v-for="(patient, x) in itemsList">
        <li v-bind:key="x">
          <div id="inner">
            <span><b>Clinic:</b> {{ patient.clinic }}</span>
            <span v-if="patient.firstTime"><b>Reason:</b> First Time Patient</span>
            <span v-if="patient.physical"
              ><b>Reason:</b> Physical Examination Required</span
            >
            <span style="white-space: nowrap"><b>Status:</b> {{ patient.pendingstatus }}</span>
          </div>
        </li>
      </template>
    </ul>
    <div id="nopending" v-if="this.itemsList.length == 0">
      <p>There is no pending booking.</p>
    </div>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      patientId: localStorage.getItem("uidPatient"),
      name: "",
      itemsList: [],
    };
  },
  components: {},
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/patientlogin");
    },
    fetchItems: function () {
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          item = querySnapShot.data();
          this.name = item.name;
          console.log(this.name);
        });

      database
        .collection("pendingbooking")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            console.log(item);
            if (item.patientId.localeCompare(this.patientId) == 0) {
              this.itemsList.push(item);
            }
          });
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#sideNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 45px 0 0 0;
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
  /*overflow-y: hidden; /*idk why some will have vertical scroll bar on sideNavBar */
}

#sideNavBar #clinic {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
}

#sideNavBar #clinic:hover {
  cursor: pointer;
}

h4 {
  font-family: Nunito;
  padding: 30px 0 0 0;
  margin-bottom: -30px;
  font-size: 32px;
  position: absolute;
  left: 300px;
}

ul {
  position: absolute;
  left: 300px;
  top: 150px;
}

li {
  position: relative;
  left: -10px;
  width: 450px;
  height: 76px;
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding: 10px 0 0 0;
  display: block;
}
div#inner {
  width: 70%;
  display: inline-block;
}
div#nopending {
  position: relative;
  top: 150px;
  width: 450px;
  height: 76px;
  display: block;
  left: 320px;
  font-size: 18px;
  font-family: Nunito;
  white-space: nowrap;
  padding: 10px 0 0 0;
  text-align: center;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
}
span {
  display: block;
  text-align: left;
}
</style>
