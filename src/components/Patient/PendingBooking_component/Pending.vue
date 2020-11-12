<template>
  <div>
    <h4>Pending Booking</h4>
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
    <!--hr /-->
    <ul>
      <template v-for="(patient, x) in itemsList">
        <li v-bind:key="x">
          <div id="inner">
            <span>{{ "Clinic: " + patient.clinic }}</span>
            <span v-if="patient.firstTime">Reason: First Time Patient</span>
            <span v-if="patient.physical"
              >Reason: Physical Examination Required</span
            >
            <span>{{ "Status: " + patient.pendingstatus }}</span>
          </div>
        </li>
      </template>
    </ul>
    <div id="nopending" v-if="this.itemsList.length == 0">
      <h4>There is no pending booking :)</h4>
    </div>

    <button v-on:click="home">Back to Home</button>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      //msg: "Pending Booking",
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
      this.$router.push("/cliniclogin");
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

    home: function () {
      this.$router.push("/patienthome");
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
/*h1 {
  position: absolute;
  width: 372px;
  height: 57px;
  left: 86px;
  top: 220px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 57px;

  color: #000000;
}*/
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
  /*overflow-y: hidden; /*idk why some will have vertical scroll bar on sideNavBar */
}

#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
}

h4 {
  font-family: Nunito;
  padding: 30px 0 0 0;
  margin-bottom: -30px;
  font-size: 32px;
  position: absolute;
  left: 300px;
}

/*hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 580px;
  top: 75px;
  background-color: rgb(0, 114, 180);
}*/
ul {
  position: absolute;
  left: 300px;
  top: 150px;
}
li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  /*top: 310px;*/
  top: 0px;
  border: 1px solid #000000;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
  display: block;
}
div#inner {
  width: 70%;
  display: inline-block;
}
div#nopending {
  position: relative;
  top: 200px;
}
span {
  display: block;
  text-align: left;
}
button {
  transition: 0.3s;
  position: absolute;
  background-color: rgb(0, 114, 180);
  border: 1px solid white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: Roboto;
  font-weight: bold;
  font-size: 14px;
  color: white;
  letter-spacing: 3px;
  outline: none;
  display: block;
  width: 150px;
  text-align: center;
  margin-left: 20px;
  height: 60px;
  left: 700px;
  top: 500px;
}
button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
</style>
