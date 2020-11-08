<template>
  <div>
    <h1>{{ msg }}</h1>
    <hr />
    <ul>
        <li id=pending>
            <span>{{"Patient Name: " + patientName}}</span>
            <span v-if="patientDetails.firstTime">{{"First Time Online / First Time at Clinic"}}</span>
            <span v-if="patientDetails.physical">{{"Conditions: " + patientDetails.conditions}}</span>
            <span>{{"Registered Phone Number: " + patientDetails.phoneNumber}}</span>
            <span>{{"Date of Birth: " + patientDetails.dob}}</span>
            <span>{{"Status: " + patientDetails.pendingstatus}}</span>
        </li>
    </ul>
    
    <div v-if="patientDetails.pendingstatus=='Clinic failed to reach patient on mobile'" id=physicalform>
        <p>Input physical appointment details as disucssed with patient:</p>
        <input type="date" v-model="date" placeholder="Appointment Date">
        <input type="time" v-model="time" placeholder="Appointment Time">
        <br>
        <br>
        <input type="submit" value="Confirm" v-on:click="scheduled">
    </div>

    <button id=fail v-if="patientDetails.pendingstatus=='Awaiting clinic staff to contact'" v-on:click='failcall'>Patient Not Verifiable and/or Failed to get to Patient</button>
    <button id=verify v-if="patientDetails.firstTime" v-on:click='verify'>Verify Patient</button>
    <button id="home" v-on:click="routeBack()">Back</button>
  </div>
</template>

<script scoped>
import database from "../../../firebase.js";
import * as firebase from "firebase";
export default {
    data() {
        return {
        msg: "Pending Booking",
        patientName: "",
        date: "",
        time: "",
        notchecked: false,
        clinicId: localStorage.getItem("uidClinic"),
        clinicName: "",
        };
    },
    props: {
        patientDetails: Object,
    },
    methods: {
        routeBack: function() {
            this.$router.push('/pendingbooking')
        },

        fetchName: function() {
            database.collection("patients").doc(this.patientDetails.patientId).get().then((doc2) => {
                let itema = doc2.data();
                this.patientName = itema.name;
            })
            database.collection("clinics").doc(this.clinicId).get().then((querySnapShot) => {
            let item = querySnapShot.data();
            this.clinicName = item.name;
            })
        },

        failcall: function () {
            if (confirm("Proceed to notify unverified patient that they have a missed call?")){
                this.notchecked = true;
                var x = this.patientDetails.patientId
                database.collection("pendingbooking").where("patientId", "==", x)
                .get()
                .then((querySnapShot) => {
                        let item = {};
                        querySnapShot.forEach((doc) => {
                            item = doc.id;
                            database.collection("pendingbooking").doc(item).update({
                                pendingstatus: "Clinic failed to reach patient on mobile"
                            
                            })
                            /* Add a notifications part to the user */
                            console.log("pendingbooking document has been updated")
                        })
                })
                this.$router.push("/pendingbooking"); 
            }
        },

        verify: function () {
            if (confirm("Proceed in verifying?")) {
                var x = this.patientDetails.patientId
                database.collection("patients").doc(x).update({
                    verifiedclinics: firebase.firestore.FieldValue.arrayUnion(this.patientDetails.clinic)
                })
                console.log("patients has been verified")
            }
            database.collection("pendingbooking").where("patientId", "==", x)
            .get()
            .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.id;
                        database.collection("pendingbooking").doc(item).delete()
                        console.log("pendingbooking document has been deleted")
                    })
            })
            /* Add a notifications part to the user */
            this.$router.push("/pendingbooking");   
        },

        scheduled: function () {
            var x = this.patientDetails.patientId
            database.collection("patients").doc(x).update({
                upcoming: {
                    0: "physical",
                    1: this.date,
                    2: this.time,
                    3: this.clinicName
                    },
            })
            console.log("physical appt has been added")

            database.collection("pendingbooking").where("patientId", "==", x)
            .get()
            .then((querySnapShot) => {
                    let item = {};
                    querySnapShot.forEach((doc) => {
                        item = doc.id;
                        database.collection("pendingbooking").doc(item).delete()
                        console.log("pendingbooking document has been deleted")
                    })
            })
            /* Add a notifications part to the user */
            this.$router.push("/pendingbooking");  
        }
    },

    created() {
        this.fetchName();
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
  top: 310px;

  border: 1px solid #000000;
  box-sizing: border-box;

  list-style-type: none; /* Remove bullets */
  padding-left: 30px;
  padding-top: 22px;
  display: block;
}
button#fail {
    position: relative;
    top: 350px;
}
button#verify {
    position: relative;
    top: 350px;
    background-color: aquamarine;
}

div#physicalform {
    position: relative;
    width: 562px;
    height: 140px;
    left: 700px;
    top: 154px;

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