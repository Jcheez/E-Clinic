<template>
  <div>
    <h4>View Appointment</h4>
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
    <div v-if="noupcoming != null" id="noupcoming">{{ this.noupcoming }}</div>
    <div v-if="this.physicalList.length > 0" id="physical">
      <span>{{
        "Date: " + this.physicalList[0][1] + " " + this.physicalList[0][2]
      }}</span>
      <span>Consult Type: Physical</span>
      <span>{{ "Clinic: " + this.physicalList[0][3] }}</span>
    </div>
    <div v-if="this.itemsList.length > 0" id="online">
      <span>{{ "Clinic: " + this.itemsList[0].clinic }}</span>
      <span>{{ "Doctor: " + this.itemsList[0].name }}</span>
      <span>{{ "Conditions: " + this.consult[0].conditions }}</span>
      <span>{{ "Date: " + this.date }}</span>
      <!-- <span>{{ "Date: " + formatDate(this.date) + " " + formatTime(this.date) }}</span> -->
      <span
        >{{ "Zoom Link: " }}
        <p id="url" v-on:click="ratings()">Link</p>
      </span>
      <rating v-if="this.urlclicked" v-bind:consult="this.consult"></rating>
    </div>
    <button
      id="cancel"
      v-if="this.itemsList.length > 0"
      v-on:click="cancelonline()"
    >
      Cancel Appointment
    </button>
    <button
      id="reschedule"
      v-if="this.itemsList.length > 0"
      v-on:click="reschedule()"
    >
      Reschedule Appointment
    </button>
    <button id="home" v-on:click="routeHome()">Back to Home</button>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import * as firebase from "firebase";
import Rating from "./Rating.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      //msg: "",
      itemsList: [],
      consult: [],
      physicalList: [],
      noupcoming: null,
      urlclicked: false,
      doctorscore: 0,
      date: "",
      patientId: localStorage.getItem("uidPatient"),
    };
  },

  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },

    routeHome: function () {
      this.$router.push("/patienthome");
    },

    ratings: function () {
      this.urlclicked = true;
      window.open(this.itemsList[0].zoom, "_blank");
      console.log("reached here");
    },

    cancelonline: function () {
      if (
        confirm("Delete your appointment? This slot will be released to others")
      ) {
        database
          .collection("consultslots")
          .where("doctor", "==", this.consult[0].doctor)
          .where("date", "==", this.consult[0].date)
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.id;
              database.collection("consultslots").doc(item).update({
                patient: null,
                conditions: null,
              });
            });
          });

        database
          .collection("patients")
          .doc(this.patientId)
          .get()
          .then((querySnapShot) => {
            let item = {};
            item = querySnapShot.id;
            let itema = querySnapShot.data();
            console.log(itema.upcoming[1]);
            let newmap = itema.appointment_history;
            var index = newmap[this.itemsList[0].clinic].indexOf(
              itema.upcoming[1]
            );
            if (index != -1) {
              newmap[this.itemsList[0].clinic].splice(index, 1);
            }
            database.collection("patients").doc(item).update({
              appointment_history: newmap,
            });
            database.collection("patients").doc(item).update({
              upcoming: null,
            });
            console.log("appointment has been cancelled");
          });
        this.$router.push("/patienthome");
      }
    },

    reschedule: function () {
      this.$router.push({
        name: "rebook",
        params: {
          consult: this.consult,
          patientId: this.patientId,
          clinic: this.consult[0].clinic,
        },
      });
    },

    formatDate: function (date) {
      let ldate = date.toLocaleDateString().split("/");
      let i0 = ldate[0];
      ldate[0] = ldate[1];
      ldate[1] = i0;
      return ldate.join("/");
    },

    formatTime: function (time) {
      let ltime = time.toLocaleTimeString().replace(" ", ":").split(":");
      ltime.splice(2, 1);
      return ltime[0] + ":" + ltime[1] + " " + ltime[2];
    },

    fetchItems: function () {
      //var x = this.name;
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let itemx = {};
          itemx = querySnapShot.data();
          this.noupcoming = null;
          var today = new Date();
          if (itemx.upcoming == null) {
            this.noupcoming = "You have no upcoming booking.";
          } else if (
            Date.parse(itemx.upcoming[1]) > today.getTime() ||
            (Date.parse(itemx.upcoming[1]) == today.getTime() &&
              itemx.upcoming[2].localeCompare(
                today.getHours() + "" + today.getMinutes() > 0
              ))
          ) {
            if (itemx.upcoming[0] == "physical") {
              console.log("hello");
              this.physicalList.push(itemx.upcoming);
              console.log(this.physicalList);
            } else if (itemx.upcoming[0] == "online") {
              database
                .collection("consultslots")
                .where("patient", "==", this.patientId)
                .get()
                .then((querySnapShot) => {
                  let item = {};
                  querySnapShot.forEach((doc) => {
                    var today = new Date();
                    item = doc.data();
                    if (item.date.seconds * 1000 >= today.getTime()) {
                      this.consult.push(item);
                      this.date = itemx.upcoming[1] + " " + itemx.upcoming[2];
                      //this.date = new Date(item.date.seconds * 1000)
                      database
                        .collection("doctors")
                        .where(
                          firebase.firestore.FieldPath.documentId(),
                          "==",
                          item.doctor
                        )
                        .get()
                        .then((querySnapShot) => {
                          let item1 = {};
                          querySnapShot.forEach((doc) => {
                            item1 = doc.data();
                            this.itemsList.push(item1);
                          });
                        });
                    }
                  });
                });
            }
          } else {
            this.noupcoming = "You have no upcoming booking.";
          }
        });
    },
  },
  components: {
    rating: Rating,
  },
  watch: {
    itemsList: function () {
      this.fetchItems();
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

div#online {
  position: absolute;
  width: 562px;
  height: 140px;
  left: 300px;
  top: 200px;
}
div#physical {
  position: absoulte;
  width: 562px;
  height: 140px;
  left: 100px;
  top: 310px;
}
div#noupcoming {
  position: absolute;
  width: 562px;
  height: 140px;
  left: 300px;
  top: 200px;
  text-align: left;
}
span {
  display: block;
  text-align: left;
}
p#url {
  display: inline;
  color: blue;
  text-decoration: underline;
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
  top: 385px;
}
button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
</style>