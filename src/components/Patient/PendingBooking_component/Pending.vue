<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <ul>
      <template v-for="(patient, x) in itemsList">
        <li v-bind:key="x">
          <div id="inner">
            <span>{{ "Patient: " + name }}</span>
            <span v-if="patient.firstTime">Reason: First Time Patient</span>
            <span v-if="patient.physical">Reason: Physical Examination Required</span>
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
export default {
  data() {
    return {
      msg: "Pending Booking",
      patientId: localStorage.getItem("uidPatient"),
      name: "",
      itemsList: [],
    };
  },
  components: {},
  methods: {
    fetchItems: function () {
        database.collection('patients').doc(this.patientId).get().then((querySnapShot) => {
          let item = {};
          item = querySnapShot.data();
          this.name = item.name;
          console.log(this.name)
        })

        database.collection("pendingbooking").get().then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
                item = doc.data();
                console.log(item)
                if (item.patientId.localeCompare(this.patientId) == 0) {
                    this.itemsList.push(item);
                }
            });
        });
    },

    home: function () {
        this.$router.push('/patienthome');
    }
  },

    created() {
        this.fetchItems();
    }
  
}
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
  top: 310px;

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
  position: relative;
  top: 350px;
}
</style>
