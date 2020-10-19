<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <ul>
        <li id=pending>
            <span>{{"Patient: " + patientDetails.name}}</span>
            <span v-if="patientDetails.firstTime">{{"First Time Online"}}</span>
            <span v-if="patientDetails.physical">{{"Conditions: " + patientDetails.conditions}}</span>
            <span>{{"Registered Phone Number: " + patientDetails.phonenum}}</span>
            <span>{{"Status: " + patientDetails.pendingstatus}}</span>
        </li>
        <button id=fail v-on:click='failcall'>Failed to get to Patient</button>
    </ul>
    
    <div id=physicalform>
        <p>Input physical appointment details as disucssed with patient:</p>
        <input type="date" v-model="date" placeholder="Appointment Date">
        <input type="time" v-model="time" placeholder="Appointment Time">
        <br>
        <br>
        <input type="submit" value="Confirm" v-on:click="scheduled">
    </div>
  </div>
</template>

<script scoped>
import database from "../firebase.js";
export default {
    data() {
        return {
        msg: "Pending Booking",
        date: "",
        time: "",
        };
    },
    props: {
        patientDetails: Object,
    },
    methods: {
        failcall: function () {
            var x = this.patientDetails.name
            database.collection("pendingbooking").where("name", "==", x)
            .get()
            .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.id;
                        database.collection("pendingbooking").doc(item).update({
                            pendingstatus: "Clinic failed to reach patient on mobile"
                        
                        })
                        console.log("pendingbooking collection has been updated")
                    })
            })  
        },

        scheduled: function () {
            var x = this.patientDetails.name
            database.collection("patients").where("name", "==", x)
            .get()
            .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.id;
                        database.collection("patients").doc(item).update({
                            upcoming: {
                                0: "physical",
                                1: this.date,
                                2: this.time
                            }
                        })
                        console.log("physical appt has been added")
                    })
            })
            
            database.collection("pendingbooking").where("name", "==", x)
            .get()
            .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.id;
                        database.collection("pendingbooking").doc(item).delete()
                        console.log("pendingbooking collection has been deleted")
                    })
            })
            this.$router.push("/pendingbooking");  
        }
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
li#pending {
  position: relative;
  width: 562px;
  height: 140px;
  left: 73px;
  top: 210px;

  border: 1px solid #000000;
  box-sizing: border-box;

  list-style-type: none; /* Remove bullets */
  padding-left: 30px;
  padding-top: 22px;
  display: block;
}
button#fail {
    position: relative;
    top: 230px;
}
div#physicalform {
    position: relative;
    width: 562px;
    height: 140px;
    left: 700px;
    top: 32px;

    border: 1px solid #000000;
    box-sizing: border-box;
}

input{
    width: 200px;
    height: 20px;
}
span {
  display: block;
  text-align: left;
}
</style>