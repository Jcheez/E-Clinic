<template>
  <div id="container">
    <h3 id="heading">
      Refer To Patient Details And Verify With Clinic Records
    </h3>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/patientsnotes">Patient Notes</router-link><br />
      <router-link to="/pendingbooking">Pending</router-link><br />
      <router-link to="/clinicsettings">Settings</router-link><br />
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <div id="main">
      <ul>
        <li id="pending">
          <span>{{ "Patient Name: " + patientName }}</span>
          <span v-if="patientDetails.firstTime">{{
            "First Time Online / First Time at Clinic"
          }}</span>
          <span v-if="patientDetails.physical">{{
            "Conditions: " + patientDetails.conditions
          }}</span>
          <span>{{
            "Registered Phone Number: " + patientDetails.phoneNumber
          }}</span>
          <span>{{ "Date of Birth: " + patientDetails.dob }}</span>
          <span>{{ "Status: " + patientDetails.pendingstatus }}</span>
        </li>
      </ul>
    </div>
    <button
      id="fail"
      v-if="patientDetails.pendingstatus == 'Awaiting clinic staff to contact'"
      v-on:click="failcall"
    >
      Patient Not Verifiable
    </button>
    <button
      id="reject"
      v-if="
        patientDetails.pendingstatus ==
        'Clinic failed to reach patient on mobile'
      "
      v-on:click="reject"
    >
      Delete Pending Booking
    </button>
    <button id="verify" v-if="patientDetails.firstTime" v-on:click="verify">
      Verify Patient
    </button>
    <br />
    <div
      v-if="
        patientDetails.pendingstatus ==
        'Clinic failed to reach patient on mobile'
      "
      id="physicalform"
    >
      <p>Input physical appointment details as discussed with patient:</p>
      <input type="date" v-model="date" placeholder="Appointment Date" />
      <input type="time" v-model="time" placeholder="Appointment Time" />
      <br />
      <br />
      <input
        type="submit"
        value="Confirm"
        id="confirm"
        v-on:click="scheduled"
      />
    </div>
  </div>
</template>

<script scoped>
import database from "../../../firebase.js";
import * as firebase from "firebase";
import { mapActions } from "vuex";
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
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    routeBack: function () {
      this.$router.push("/pendingbooking");
    },

    fetchName: function () {
      database
        .collection("patients")
        .doc(this.patientDetails.patientId)
        .get()
        .then((doc2) => {
          let itema = doc2.data();
          this.patientName = itema.name;
        });
      database
        .collection("clinics")
        .doc(this.clinicId)
        .get()
        .then((querySnapShot) => {
          let item = querySnapShot.data();
          this.clinicName = item.name;
          console.log(this.clinicName);
        });
    },

    formatDate: function (date) {
      let filter_year = date.getFullYear();
      let filter_month = date.getMonth() + 1;
      let filter_day = date.getDate();
      return filter_day + "/" + filter_month + "/" + filter_year;
    },

    failcall: function () {
      if (
        confirm(
          "Proceed to notify unverified patient that they have a missed call?"
        )
      ) {
        this.notchecked = true;
        var x = this.patientDetails.patientId;
        database
          .collection("pendingbooking")
          .where("patientId", "==", x)
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.id;
              database.collection("pendingbooking").doc(item).update({
                pendingstatus: "Clinic failed to reach patient on mobile",
              });
              /* Add a notifications part to the user */
              database
                .collection("patients")
                .doc(x)
                .get()
                .then((doc) => {
                  let item = doc.data();
                  let newMessages = item.newNotifications;
                  newMessages.splice(
                    0,
                    0,
                    this.formatDate(new Date()) +
                      ": " +
                      this.clinicName +
                      " has attempted to contact you"
                  );

                  database.collection("patients").doc(x).update({
                    newNotifications: newMessages,
                  });
                  console.log("pendingbooking document has been updated");
                });
            });
          });
        this.$router.push("/pendingbooking");
      }
    },

    reject: function () {
      if (confirm("Proceed to delete patient's pending booking")) {
        var x = this.patientDetails.patientId;
        database
          .collection("pendingbooking")
          .where("patientId", "==", x)
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.id;
              console.log(item);
              database.collection("pendingbooking").doc(item).delete();
              /* Add a notifications part to the user */
              database
                .collection("patients")
                .doc(x)
                .get()
                .then((doc) => {
                  let item = doc.data();
                  let newMessages = item.newNotifications;
                  newMessages.splice(
                    0,
                    0,
                    this.formatDate(new Date()) +
                      ": " +
                      this.clinicName +
                      " has deleted your pending booking"
                  );

                  database.collection("patients").doc(x).update({
                    newNotifications: newMessages,
                  });
                  console.log("pendingbooking document has been deleted");
                });
            });
          });
        this.$router.push("/pendingbooking");
      }
    },

    verify: function () {
      if (confirm("Proceed in verifying?")) {
        var x = this.patientDetails.patientId;
        database
          .collection("patients")
          .doc(x)
          .update({
            verifiedclinics: firebase.firestore.FieldValue.arrayUnion(
              this.patientDetails.clinic
            ),
          });
        console.log("patients has been verified");
      }
      database
        .collection("pendingbooking")
        .where("patientId", "==", x)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.id;
            database.collection("pendingbooking").doc(item).delete();
            console.log("pendingbooking document has been deleted");
          });
        });
      /* Add a notifications part to the user */
      database
        .collection("patients")
        .doc(x)
        .get()
        .then((doc) => {
          let item = doc.data();
          let newMessages = item.newNotifications;
          newMessages.splice(
            0,
            0,
            this.formatDate(new Date()) +
              ": You have been verified by " +
              this.clinicName +
              ", you can now proceed to book consult with them."
          );

          database.collection("patients").doc(x).update({
            newNotifications: newMessages,
          });
        });
      this.$router.push("/pendingbooking");
    },

    scheduled: function () {
      var x = this.patientDetails.patientId;
      database
        .collection("patients")
        .doc(x)
        .update({
          upcoming: {
            0: "physical",
            1: this.date,
            2: this.time,
            3: this.clinicName,
          },
        });
      console.log("physical appt has been added");

      database
        .collection("pendingbooking")
        .where("patientId", "==", x)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.id;
            database.collection("pendingbooking").doc(item).delete();
            console.log("pendingbooking document has been deleted");
          });
        });
      /* Add a notifications part to the user */
      database
        .collection("patients")
        .doc(x)
        .get()
        .then((doc) => {
          let item = doc.data();
          let newMessages = item.newNotifications;
          newMessages.splice(
            0,
            0,
            this.formatDate(new Date()) +
              ": Clinic has scheduled a physical appointment for you, check it in view appointment tab"
          );

          database.collection("patients").doc(x).update({
            newNotifications: newMessages,
          });
        });
      this.$router.push("/pendingbooking");
    },
  },

  created() {
    this.fetchName();
  },
};
</script>

<style scoped>
#container {
  position: relative;
}

#main {
  position: absolute;
  top: 50px;
  margin-left: 200px;
}

h3#heading {
  position: absolute;
  left: 230px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 22px;
}

#sideNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  display: inline-block;
  margin: 50px 0 0 0;
  text-decoration: none;
}

#sideNavBar a:hover {
  font-size: 18px;
  color: white;
  cursor: pointer;
}
#sideNavBar {
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
  font-weight: bold;
  letter-spacing: 2px;
}

#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bold;
  padding: 10px 0px 0px 0px;
}

ul {
  float: left;
  margin-top: 50px;
}

li {
  width: 550px;
  height: 160px;
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
  box-sizing: border-box;
  list-style-type: none; /* Remove bullets */
  padding: 10px 0 0 20px;
  display: block;
  text-align: left;
}

span {
  font-family: Nunito;
  position: relative;
  top: 14px;
  display: block;
  text-align: left;
  font-size: 18px;
}

li a {
  color: white;
  text-decoration: none;
}

input[type="time"],
input[type="date"] {
  position: relative;
  top: 20px;
  display: block;
  text-align: left;
  color: rgb(0, 114, 180);
  font-family: Nunito;
  font-size: 14px;
  width: 280px;
  padding: 10px;
  margin: 15px 0px 5px 30px;
  border: none;
  background-color: rgba(122, 113, 113, 0.04);
}

div#physicalform {
  position: absolute;
  width: 550px;
  height: 162px;
  left: 230px;
  top: 350px;
  font-size: 18px;
  font-family: Nunito;
  white-space: nowrap;
  padding: 10px 0px 0px 20px;
  text-align: center;
}

button {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: rgb(0, 114, 180);
  letter-spacing: 1px;
  font-family: Nunito;
  /* font-weight: bold; */
  color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  position: absolute;
  height: 36px;
}

#confirm {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  background-color: rgb(0, 114, 180);
  letter-spacing: 2px;
  font-family: Nunito;
  /* font-weight: bold; */
  color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  position: relative;
  left: -200px;
  width: 80px;
  height: 36px;
  margin-bottom: 50px;
}

#confirm:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}

button#verify {
  top: 300px;
  left: 580px;
}

button#reject {
  top: 300px;
  left: 300px;
}

button#fail {
  top: 300px;
  left: 300px;
}

button:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
</style>