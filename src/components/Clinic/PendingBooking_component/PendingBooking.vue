<template>
  <div>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>
      <router-link to="/clinichome">Dashboard</router-link><br />
      <router-link to="/doctorslist">Doctors</router-link><br />
      <router-link to="/patientsnotes">Patient Notes</router-link><br />
      <router-link to="/pendingbooking">Pending</router-link><br />
      <router-link to="/clinicsettings">Settings</router-link><br />
      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <h4>{{ msg }}</h4>
    <div id="emptyDiv" v-if="itemsList.length == 0">
      There are no pending bookings by patients.
    </div>
    <div id="main">
      <ul>
        <template v-for="(patient, x) in itemsList">
          <li v-bind:key="x">
            <div id="inner">
              <span style="white-space:nowrap">{{ "Patient: " + getPatientName(patient.patientId) }}</span>
              <span v-if="patient.firstTime && patient.physical" style="white-space:nowrap"
                >Reason: First Time Patient and Physical Examination Required</span
              >
              <span v-else-if="patient.physical" style="white-space:nowrap"
                >Reason: Physical Examination Required</span
              >
              <span v-else-if="patient.firstTime" style="white-space:nowrap"
                >Reason: First Time Patient</span
              >
            </div>
            <button
              class="seeDetailsbutton"
              v-if="patient.physical && patient.firstTime"
            >
              <router-link
                :to="{ name: 'resolve', params: { patientDetails: patient } }"
              >
                See Details
              </router-link>
            </button>
            <button
              class="seeDetailsbutton"
              v-else-if="patient.physical || patient.firstTime"
            
            >
              <router-link
                :to="{ name: 'resolve', params: { patientDetails: patient } }"
              >
                See Details
              </router-link>
            </button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import { mapGetters, mapActions } from "vuex";

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
      patients: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  components: {},
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/cliniclogin");
    },
    fetchItems: function () {
      console.log(this.itemsList);
      //let x = this.getUser.displayName;
      database.collection("pendingbooking").onSnapshot((res) => {
        const changes = res.docChanges();

        changes.forEach((change) => {
          //console.log(change.doc.data())
          if (change.doc.data().clinic == this.getUser.displayName) {
            if (change.type === "added") {
              this.itemsList.push(change.doc.data());
            } else if (change.type === "modified") {
              this.itemsList = this.itemsList.filter(
                (item) =>
                  item.patientId.localeCompare(change.doc.data().patientId) !==
                  0
              );
              this.itemsList.push(change.doc.data());
            } else if (change.type === "removed") {
              this.itemsList = this.itemsList.filter(
                (item) =>
                  item.patientId.localeCompare(change.doc.data().patientId) !==
                  0
              );
            }
          }
        });
      });

      database
        .collection("pendingbooking")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data().patientId;
            //console.log(item)
            database
              .collection("patients")
              .doc(item)
              .get()
              .then((doc2) => {
                //console.log(doc2.data())
                let itema = doc2.data();
                this.name = itema.name;
              });
          });
        });
    },

    getPatients: function() {
      database
      .collection("patients")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          let item = doc.data();
          item.id = doc.id
          this.patients.push(item)
        })
      })
    },

    getPatientName: function(docId) {
      for (let index = 0; index < this.patients.length; index++) {
        let currentId = this.patients[index]["id"]
        if (currentId.localeCompare(docId) == 0) {
          return this.patients[index]["name"]
        }
      }
    }
  },
  created() {
    this.fetchItems();
    this.getPatients();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
#container {
  position: relative;
}

#main {
  position: absolute;
  top: 100px;
  margin-left: 200px;
}

h4 {
  position: absolute;
  left: 250px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 32px;
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

div #inner {
  width: 50%;
  display: inline-block;
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
  height: 130px;
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

div#emptyDiv {
  position: absolute;
  top: 150px;
  left: 250px;
  height: 40px;
  width: 400px;
  font-size: 18px;
  font-family: Nunito;
  white-space: nowrap;
  padding: 20px 10px 0px 10px;
  text-align: center;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.377);
}

.seeDetailsbutton {
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
  top:55px;
  left: 140px

}

.seeDetailsbutton:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
}
</style>
