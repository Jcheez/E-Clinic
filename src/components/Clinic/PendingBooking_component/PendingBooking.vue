<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <p v-if="itemsList.length == 0">There are no pending bookings by patients.</p>
    <ul>
      <template v-for="(patient, x) in itemsList">
        <li v-bind:key="x">
          <div id="inner">
            <span>{{ "Patient ID: " + patient.patientId }}</span>
            <span v-if="patient.firstTime">Reason: First Time Patient</span>
            <span v-if="patient.physical">Reason: Physical Examination Required</span>
          </div>
          <button id="outofplace" v-if="patient.physical && patient.firstTime">
            <router-link :to="{ name:'resolve', params: {patientDetails: patient}}">
            See Details
            </router-link>
          </button>
          <button v-else-if="patient.physical || patient.firstTime">
            <router-link :to="{ name:'resolve', params: {patientDetails: patient}}">
            See Details
            </router-link>
          </button>
        </li>
      </template>
    </ul>
    <button id="home" v-on:click="routeHome()">Home</button>
  </div>
</template>

<script>
import database from "../../../firebase.js";
//import * as firebase from "firebase";

export default {
  data() {
    return {
      /* when clinic login is complete, remember to props clinic name / something unique
       * otherwise doctors will be able to see pending bookings of all clinic
       */ 
      msg: "Pending Booking",
      itemsList: [],
      name: "",
      clinicId: localStorage.getItem("uidClinic"),
      clinicName: "",
    };
  },
  components: {},
  methods: {
    routeHome: function() {
      this.$router.push('/clinichome')
    },
    fetchItems: function () {
      console.log(this.itemsList)
      database.collection("clinics").doc(this.clinicId).get().then((querySnapShot) => {
        let item = querySnapShot.data();
        this.clinicName = item.name;
        console.log(this.clinicName)
      
        database.collection("pendingbooking").onSnapshot((res) => {
          const changes = res.docChanges();

          changes.forEach((change) => {
            //console.log(change.doc.data())
            if (change.doc.data().clinic == this.clinicName) {
              if (change.type === "added") {
                this.itemsList.push(change.doc.data());
              } else if (change.type === "modified") {
                this.itemsList = this.itemsList.filter(
                  (item) => item.patientId.localeCompare(change.doc.data().patientId) !== 0
                );
                this.itemsList.push(change.doc.data());
              } else if (change.type === "removed") {
                this.itemsList = this.itemsList.filter(
                  (item) => item.patientId.localeCompare(change.doc.data().patientId) !== 0
                );
              }
            }
          });
        });
      });

      database.collection("pendingbooking").get().then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach((doc) => {
          item = doc.data().patientId;
          //console.log(item)
          database.collection("patients").doc(item).get().then((doc2) => {
            //console.log(doc2.data())
            let itema = doc2.data();
            this.name = itema.name;
          })
        });
      })
    }
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
h1 {
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
}

hr {
  position: absolute;
  width: 1459px;
  height: 40px;
  left: 520px;
  top: 250px;
  background-color: #1677cf;
}
li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  top: 350px;

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
span {
  display: block;
  text-align: left;
}
button {
  width: 125px;
  height: 30px;
  background: rgba(169, 47, 47, 0.4);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 15px;
}

a {
  color: black;
  text-decoration: none;
}

button#outofplace {
  position: relative;
  bottom: 16px;
}


</style>
