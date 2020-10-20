<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <ul>
      <template v-for="(patient, x) in itemsList">
        <li v-bind:key="x">
          <div id="inner">
            <span>{{ "Patient: " + patient.name }}</span>
            <span v-if="patient.firstTime">Reason: First Time Patient</span>
            <span v-if="patient.physical"
              >Reason: Physical Examination Required</span
            >
          </div>
          <button id="outofplace" v-if="patient.physical && patient.firstTime">
            <router-link :to="{ name:'resolve', params: {patientDetails: patient}}">
            Make A Booking
            </router-link>
          </button>
          <button v-else-if="patient.physical || patient.firstTime">
            <router-link :to="{ name:'resolve', params: {patientDetails: patient}}">
            Make A Booking
            </router-link>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import database from "../../firebase.js";
export default {
  data() {
    return {
      /* when clinic login is complete, remember to props clinic name / something unique
       * otherwise doctors will be able to see pending bookings of all clinic
       */ 
      msg: "Pending Booking",
      itemsList: [],
    };
  },
  components: {},
  methods: {
    fetchItems: function () {
      database.collection("pendingbooking").onSnapshot((res) => {
        const changes = res.docChanges();

        changes.forEach((change) => {
          if (change.type === "added") {
            this.itemsList.push(change.doc.data());
          } else if (change.type === "modified") {
            this.itemsList = this.itemsList.filter(
              (item) => item.name.localeCompare(change.doc.data().name) !== 0
            );
            this.itemsList.push(change.doc.data());
          } else if (change.type === "removed") {
            this.itemsList = this.itemsList.filter(
              (item) => item.name.localeCompare(change.doc.data().name) !== 0
            );
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
  top: 210px;

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
