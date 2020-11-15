<template>
  <div id="container">
    <h4>Make A Booking</h4>
    <div id="topNavBar">
      <span>E-Clinic</span>
      <!--router-link to="/makebooking">Make A Booking</router-link-->
      <!-- <router-link to="/pending">Pending Booking</router-link>
      <router-link to="/viewdocuments">View Documents</router-link>
      <router-link to="/managepayments">Manage Payments</router-link> -->
      <router-link to="/patienthome">Return Home</router-link>
      <router-link to="/patientsettings">Settings</router-link>
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>

    <v-date-picker
      :attributes="attributes"
      v-model="date"
      is-inline
      :min-date="new Date()"
      id="datepicker"
    />
    <!--div id="inner"-->
    <ul id="slots">
      <li v-for="(s, index) in this.docsName" :key="index">
        <div id="inner">
          <h3 style="font-size: 30px; text-decoration: underline">{{ s }}</h3>
          <div v-for="(v, index) in slot" :key="index" id="tile">
            <button
              v-if="s.localeCompare(v.doctorName) == 0"
              v-on:click="
                getdoc(v.id);
                updateApptHist();
              "
            >
              {{ formatTime(v.date) }}
            </button>
          </div>
        </div>
      </li>
    </ul>
    <p id="emptyDiv" v-if="this.docsName.length == 0">
      There are no available appointment slots today.<br />Please select another
      day.
    </p>
    <!--/div-->
  </div>
</template>

<script>
import database from "../../../firebase.js";
//import * as firebase from "firebase";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      //msg: "Make Booking",
      date: new Date(),
      slot: [],
      datadoc: {},
      docsName: [],
      apptHist: {},
      all: [],
      show: [],
    };
  },
  computed: {
    attributes() {
      return this.show.map((t) => ({
        //key: `todo.${t.id}`,
        dot: "green",
        dates: t.date.toDate(),
        customData: t,
      }));
    },
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/patientlogin");
    },
    fetchitems: function () {
      database
        .collection("consultslots")
        .where("clinic", "==", this.clinic)
        .orderBy("date")
        .get()
        .then((querySnapShot) => {
          let temp = [];
          let temp2 = [];
          let temp3 = {};
          let temp4 = [];
          this.docsName = [];
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();

            let item_year = item.date.toDate().getFullYear();
            let item_month = item.date.toDate().getMonth();
            let item_day = item.date.toDate().getDate();

            let filter_year = this.date.getFullYear();
            let filter_month = this.date.getMonth();
            let filter_day = this.date.getDate();

            if (item.patient == null && new Date() <= item.date.toDate()) {
              if (
                temp3[item_year + " " + item_month + " " + item_day] ==
                undefined
              ) {
                temp3[item_year + " " + item_month + " " + item_day] = [item];
              } else {
                temp3[item_year + " " + item_month + " " + item_day].push(item);
              }
              let item2 = item;
              item2.id = doc.id;
              database
                .collection("doctors")
                .doc(item.doctor)
                .get()
                .then((doc) => {
                  let docName = doc.data().name;
                  //console.log(docName)
                  item2.doctorName = docName;
                  //console.log(item)
                  temp.push(item2);

                  if (
                    item_year == filter_year &&
                    item_month == filter_month &&
                    item_day == filter_day
                  ) {
                    temp2.push(item2);
                    if (this.docsName.includes(docName) == false) {
                      this.docsName.push(docName);
                    }
                  }
                });
            }
          });
          this.all = temp;
          this.slot = temp2;
          for (var s in temp3) {
            while (temp3[s].length > 3) {
              if (temp3[s][0].patient) {
                let item = temp3[s][0];
                temp3[s].pop();
                temp3[s].push(item);
              }
              temp3[s].pop();
            }
            for (var ss in temp3[s]) {
              temp4.push(temp3[s][ss]);
            }
          }
          this.show = temp4;
        });
    },

    formatTime: function (time) {
      let min = time.toDate().getMinutes();
      let h = time.toDate().getHours();
      if (h < 10) {
        h = "0" + h;
      }
      if (min == 0) {
        min = "00";
      }
      return h + ":" + min;
    },

    getdoc: function (ide) {
      database
        .collection("consultslots")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            if (ide.localeCompare(doc.id) == 0) {
              this.datadoc = doc.data();
              database
                .collection("consultslots")
                .doc(ide)
                .update({
                  patient: this.patientId,
                  conditions: this.conditions,
                })
                .then(() => {
                  database
                    .collection("doctors")
                    .doc(this.datadoc.doctor)
                    .get()
                    .then((doc) => {
                      this.$router.push({
                        name: "makebookingconfirmation",
                        params: {
                          appdate: this.datadoc.date,
                          doctor: doc.data().name,
                        },
                      });
                    });
                  alert("Appointment Slot booked");
                });
            }
          });
        });
    },
    updateApptHist: function () {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var day = this.date.getDate();
      var monthIndex = this.date.getMonth();
      var year = this.date.getFullYear();

      var apptDate = day + " " + monthNames[monthIndex] + " " + year;

      if (this.apptHist[this.clinic] == undefined) {
        this.apptHist[this.clinic] = [apptDate];
      } else {
        this.apptHist[this.clinic].splice(0,0,apptDate);
      }
      //console.log(this.apptHist)

      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          item = querySnapShot.id;
          database.collection("patients").doc(item).update({
            appointment_history: this.apptHist,
          });
          database
            .collection("patients")
            .doc(item)
            .update({
              upcoming: {
                0: "online",
                1: day + " " + monthNames[monthIndex] + " " + year,
                2: this.formatTime(this.datadoc.date),
                3: this.clinic,
              },
            });
          //console.log("online appt has been added")
        });
    },

    routeHome: function () {
      this.$router.push("/makebooking");
    },

    getApptHist: function () {
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          this.apptHist = querySnapShot.data().appointment_history;
          //console.log(this.apptHist)
          //console.log("Done")
        });
    },
  },
  created() {
    this.fetchitems();
    this.getApptHist();
  },
  watch: {
    date: function () {
      this.slot = [];
      this.docsName = [];
      let date_year = this.date.getFullYear();
      let date_month = this.date.getMonth();
      let date_day = this.date.getDate();
      this.slot = this.all.filter(
        (t) =>
          t.date.toDate().getDate() == date_day &&
          t.date.toDate().getMonth() == date_month &&
          t.date.toDate().getFullYear() == date_year
      );
      for (var s of this.slot) {
        if (this.docsName.includes(s.doctorName) == false) {
          this.docsName.push(s.doctorName);
        }
      }
    },
  },
  props: {
    conditions: Array,
    patientId: String,
    clinic: String,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
#topNavBar span {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  width: 100%;
  display: block;
}

#topNavBar a {
  color: rgb(238, 249, 255);
  transition: 0.3s;
  font-family: Nunito;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 10px 100px 0 45px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
}

#topNavBar a:hover {
  font-size: 18px;
  color: white;
  cursor: pointer;
}

#topNavBar {
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  width: 100%;
  /* border: 1px solid white; */
  /* border-radius: 5px; */
  background-color: rgb(0, 114, 180);
  color: rgb(238, 249, 255);
}

h4 {
  font-family: Nunito;
  position: absolute;
  top: 100px;
  left: 80px;
  font-size: 26px;
}
#datepicker {
  position: absolute;
  top: 195px;
  left: 80px;
}

#inner {
  position: relative;
  top: 0px;
  left: 0px;
  width: 750px;
}

#inner h3 {
  position: relative;
  left: 0px;
  text-align: left;
  font-family: Nunito;
  margin: 0 0 10px 0;
}
#slots {
  position: absolute;
  left: 400px;
  top: 140px;
  width: 700px;
}
li {
  list-style-type: none; /* Remove bullets */
  display: inline-block;
  padding-bottom: 8px;
  position: relative;
  left: 0px;
}
#inner #tile {
  position: relative;
  float: left;
  flex-direction: row;
}

#inner #tile button {
  transition: box-shadow 0.3s;
  transition: 0.3s;
  color: rgb(0, 114, 180);
  letter-spacing: 2px;
  width: 125px;
  height: 45px;
  background-color: white;
  border: 1px solid rgb(0, 114, 180);
  border-radius: 5px;
  z-index: -1;
  margin: 0px 10px 8px 0;
}

#inner #tile button:hover {
  color: white;
  background-color: rgb(0, 114, 180);
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  cursor: pointer;
}
#emptyDiv {
  font-family: Nunito;
  font-size: 18px;
  position: absolute;
  top: 200px;
  left: 500px;
}
</style>