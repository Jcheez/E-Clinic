<template>
  <div id="container">
    <div id="sideNavBar">
      <router-link to="/patienthome" id="clinic">E-Clinic</router-link>
      <router-link to="/makebooking">Make A Booking</router-link>
      <router-link to="/pending">Pending Booking</router-link>
      <router-link to="/viewdocuments">View Documents</router-link>
      <router-link to="/managepayments">Manage Payments</router-link>
      <router-link to="/patientsettings">Settings</router-link>
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <h4>Documents</h4>
    <p id="choose">Choose a Clinic:</p>
    <div id="main">
      <select v-model="selected">
        <option
          v-for="(clinic, x) in clinic"
          v-bind:value="clinic"
          v-bind:key="x"
        >
          {{ clinic }}
        </option>
      </select>
      <br />
      <div id="instructions">
        <p v-if="selected">List of Appointment History</p>
        <p v-if="selected">
          Click on 'View' to see all documents related to that appointment
        </p>
      </div>
      <ul id="patients">
        <li v-for="(appt, index) in this.itemsList" :key="index">
          <div id="inner">
            <span>{{ "Date: " + appt }}</span>
          </div>
          <button id="view">
            <router-link
              :to="{
                name: 'view',
                params: { apptDate: appt, clinic: selected },
              }"
              >View</router-link
            >
          </button>
        </li>
      </ul>
      <div id="emptyDiv" v-if="itemsList.length == 0 && selected != ''">
        <p>You did not arrange any appointments <br />with this clinic yet.</p>
      </div>
      <!-- <button id="home" v-on:click="routeHome()">Back to home</button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import database from "../../../firebase.js";

export default {
  data() {
    return {
      msg: "Patient's Notes ",
      itemsList: [],
      clinic: [],
      selected: "",
      patientId: localStorage.getItem("uidPatient"),
    };
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
    routeHome: function () {
      this.$router.push("/patienthome");
    },

    fetchItems: function () {
      console.log(this.patientId);
      //var x = this.name;
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          item = querySnapShot.data().appointment_history;
          console.log(item);
          for (var clinic in item) {
            this.clinic.push(clinic);
          }
        });
    },

    fetchItems2: function () {
      this.itemsList = [];
      //var x = this.name;
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          item = querySnapShot.data().appointment_history;
          console.log(item);
          let arrayOfApptDates = item[this.selected];
          for (var date in arrayOfApptDates) {
            this.itemsList.push(arrayOfApptDates[date]);
          }
          console.log(this.itemsList);
        });
    },
  },
  watch: {
    selected: function () {
      this.fetchItems2();
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#container {
  position: relative;
}
#main {
  position: absolute;
  top: 100px;
  display: inline-block;
  left: 300px;
}

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

select {
  position: absolute;
  left: 200px;
  top: 23px;
  width: 200px;
  font-family: Nunito;
  font-size: 14px;
}

option {
  font-size: 14px;
}
p#choose {
  position: absolute;
  left: 410px;
  top: 80px;
  font-family: Nunito;
  margin: 40px -30px 0px -100px;
  font-size: 20px;
  color: rgb(0, 114, 180);
}
div #inner {
  width: 55%;
  display: inline-block;
}

ul {
  float: left;
  /*margin-top: 50px;*/
  position: absolute;
  top: 130px;
}

li {
  width: 400px;
  height: 76px;
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding: 10px 0 0 0;
  display: block;
  left: 0px;
  position: relative;
}

span {
  font-family: Nunito;
  position: relative;
  top: 20px;
  display: block;
  text-align: left;
  font-size: 18px;
}

button#view {
  position: relative;
  transition: box-shadow 0.3s;
  transition: 0.3s;
  top: 20px;
  left: 30px;
  width: 85px;
  height: 30px;
  background-color: rgb(0, 114, 180);
  border: none;
  /* border-radius: 15px; */
  font-size: 16px;
  font-family: Nunito;
  border-radius: 4px;
}

button#view:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

button:hover {
  cursor: pointer;
}
button:focus {
  outline: none;
}

li a {
  color: white;
  text-decoration: none;
}

#instructions {
  position: absolute;
  left: 10px;
  width: 500px;
  text-align: left;
  top: 50px;
}

div#emptyDiv {
  position: absolute;
  width: 400px;
  height: 76px;
  display: block;
  /*left: 320px;
  top: 60px;*/
  font-size: 18px;
  font-family: Nunito;
  white-space: nowrap;
  padding: 10px 0 0 0;
  text-align: center;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
  top: 130px;
}
</style>