<template>
    <div>
        <h1>{{ msg }}</h1>
        <ul id="patients">
          <li v-for="(appt, index) in this.itemsList[0]" :key="index">
            <div id="inner">
              <span>{{ "Date: " + appt }}</span>
            </div>
            <button id="view">
              <router-link :to="{ name:'view', params: {apptDate: appt, patientId: patientid}}">View</router-link>
            </button>
          </li>
        </ul>
        <p v-if="itemsList.length == 0">There are no documents to view</p>
        <button id="home" v-on:click="routeHome()">Back to home</button>
    </div>  
</template>

<script>
import database from "../../../firebase.js";

export default {
  data() {
    return {
      msg: "Patient's Notes ",
      itemsList: [],
      patientId: localStorage.getItem("uidPatient")
    };
  },

  methods: {
    routeHome: function() {
        this.$router.push('/patienthome')
    },
        
    fetchItems: function () {
        //var x = this.name;
        database
            .collection("patients")
            .doc(this.patientId)
            .get()
            .then((querySnapShot) => {
                let item = {};
                  item = querySnapShot.data();
                  this.itemsList.push(item.appointment_history);
                  console.log(this.itemsList)
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
div#inner {
  width: 70%;
  display: inline-block;
}
li {
  position: relative;
  width: 562px;
  height: 100px;
  left: 73px;
  top: 230px;
  border: 1px solid #000000;
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding-left: 10px;
  padding-top: 20px;
  display: block;
}
span {
  position: relative;
  top: 14px;
  display: block;
  text-align: left;
  font-size: 20px;
}
button#view {
  position: relative;
  top: 14px;
  width: 125px;
  height: 30px;
  background: aqua;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 15px;
  font-size: 20px;
}
button:hover {
  cursor: pointer;
}
button:focus {
  outline: none;
}
button#home{
  position: relative;
  top: 250px;
}
</style>