<template>
  <div>
    <h4>Make A Booking</h4>
    <div id="sideNavBar">
      <h3>E-Clinic</h3>

      <router-link to="/makebooking">Make A Booking</router-link>

      <router-link to="/pending">Pending Booking</router-link>

      <router-link to="/viewdocuments">View Documents</router-link>

      <router-link to="/managepayments">Manage Payments</router-link>

      <router-link to="/patientsettings">Settings</router-link>

      <a @click="signOut" class="button is-primary">Logout</a>
    </div>
    <div id="main">
      <div id="selectClinic">
        <h3 id="choose">Please Choose a Clinic:</h3>
        <select v-model="selected">
          <option
            v-for="(clinic, x) in clinics"
            v-bind:value="clinic.name"
            v-bind:key="x"
          >
            {{ clinic.name }}
          </option>
        </select>
        <br />
        <span id="selectStatement" v-if="selected"
          >You have selected:
          <div
            style="
              font-family: Nunito;
              color: rgb(0, 114, 180);
              display: inline-block;
            "
          >
            {{ selected }}
          </div></span
        >
      </div>
      <br />

      <div id="allconditions">
        <h3>Please Select the Conditions You Are Experiencing:</h3>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Fever"
            value="Fever"
            v-model="checkedConditions"
          />
          <label for="Fever">Fever</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Cough"
            value="Cough"
            v-model="checkedConditions"
          />
          <label for="Cough">Cough</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Runny Nose"
            value="Runny Nose"
            v-model="checkedConditions"
          />
          <label for="Runny Nose">Runny Nose</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Sore Throat"
            value="Sore Throat"
            v-model="checkedConditions"
          />
          <label for="Sore Throat">Sore Throat</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Chest Pain"
            value="Chest Pain"
            v-model="checkedConditions"
          />
          <label for="Chest Pain">Chest Pain</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Diarrhoea"
            value="Diarrhoea"
            v-model="checkedConditions"
          />
          <label for="Diarrhoea">Diarrhoea</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Skin Conditions"
            value="Skin Conditions"
            v-model="checkedConditions"
          />
          <label for="Skin Conditions">Skin Conditions</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="High Blood Pressure"
            value="High Blood Pressure"
            v-model="checkedConditions"
          />
          <label for="High Blood Pressure">High Blood Pressure</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Diabetes"
            value="Diabetes"
            v-model="checkedConditions"
          />
          <label for="Diabetes">Diabetes</label>
        </div>
        <div id="conditionSet">
          <input
            type="checkbox"
            id="Family Planning"
            value="Family Planning"
            v-model="checkedConditions"
          />
          <label for="Family Planning">Family Planning</label>
        </div>
      </div>
      <br />
      <span id="selectedCon">Checked Conditions: {{ checkedConditions }}</span>
      <br />
      <br />

      <div id="buttons">
        <p id="error">{{ this.errorstring }}</p>
        <button @click="next">Next</button>
        <button id="home" v-on:click="routeHome()">Back to Home</button>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../../../firebase.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      /* Remember to change this part when login is finished and props can be passed
            props: {
                name: "",
                phonenum: ""
            } */
      patientId: localStorage.getItem("uidPatient"),
      //phonenum: "98712345",
      clinics: [],
      selected: "",
      checkedConditions: [],
      errorstring: "",
      firstbool: [],
      availableToBook: "",
      consultslots: [],
    };
  },

  methods: {
    routeHome: function () {
      this.$router.push("/patienthome");
    },
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
      this.$router.push("/patientlogin");
    },

    next: function () {
      if (!this.selected && this.checkedConditions.length == 0) {
        this.errorstring = "Please choose a clinic and at least 1 condition";
      } else if (!this.selected) {
        this.errorstring = "Please choose a clinic";
      } else if (this.checkedConditions.length == 0) {
        this.errorstring = "Please choose at least 1 condition";
      } else if (this.availableToBook == false) {
        alert("You have an upcoming appointment. Unable to make a new Booking");
        this.$router.push("/patienthome");
      } else if (this.checkpending(this.selected, this.consultslots)) {
        alert("You have a pending booking with this particular clinic.");
        this.$router.push("/pending");
      } else {
        this.errorstring = "";
        var a = this.checkedConditions;
        var physicalbool =
          a.includes("Fever") ||
          a.includes("Cough") ||
          a.includes("Sore Throat") ||
          a.includes("Runny Nose") ||
          a.includes("Chest Pain");
        database
          .collection("patients")
          .doc(this.patientId)
          .get()
          .then((querySnapShot) => {
            let item = {};
            item = querySnapShot.data();
            let aa = item.phoneNumber;
            let bb = item.dob;
            console.log(item.verifiedclinics);
            var firstbool = !item.verifiedclinics.includes(this.selected);

            console.log(physicalbool);

            if (physicalbool || firstbool) {
              this.$router.push("/makebooking/makebookingter");
              database.collection("pendingbooking").add({
                patientId: this.patientId,
                phoneNumber: aa,
                dob: bb,
                clinic: this.selected,
                physical: physicalbool,
                firstTime: firstbool,
                conditions: a,
                pendingstatus: "Awaiting clinic staff to contact",
              });
            } else {
              console.log("you have reached here");
              this.$router.push({
                name: "makebookingpass",
                params: {
                  conditions: this.checkedConditions,
                  patientId: this.patientId,
                  clinic: this.selected,
                },
              });
            }
          });
      }
    },

    checkAbleToBook: function () {
      database
        .collection("patients")
        .doc(this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          item = querySnapShot.data();
          var today = new Date();
          //console.log(Date.parse(item.upcoming[1]) == today.getTime())
          if (item.upcoming == null) {
            this.availableToBook = true;
          } else if (Date.parse(item.upcoming[1]) > today.getTime()) {
            this.availableToBook = false;
          } else if (Date.parse(item.upcoming[1]) == today.getTime()) {
            if (
              item.upcoming[2].localeCompare(
                today.getHours() + "" + today.getMinutes() > 0
              )
            ) {
              this.availableToBook = false;
            }
          } else {
            console.log("asdasd");
            this.availableToBook = true;
            console.log(this.availableToBook);
          }
        });
    },

    fetchItems: function () {
      /*
            database.collection('patients').doc(this.patientId).get().then((querySnapShot) => {
                let item = {};
                item = querySnapShot.data();
                this.phonenum = item.phonenum;
            })*/

      database
        .collection("clinics")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            if (item.doctors) {
              this.clinics.push(item);
            }
          });
        });
    },

    getConsults: function () {
      database
        .collection("pendingbooking")
        .where("patientId", "==", this.patientId)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            this.consultslots.push(item);
          });
        });
    },

    checkpending: function (clinicName, slots) {
      let consultslotsarray = slots;
      let result = consultslotsarray
        .map((x) => x.clinic)
        .filter((x) => x.localeCompare(clinicName) == 0);
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.fetchItems();
    this.checkAbleToBook();
    this.getConsults();
  },
};
</script>

<style scoped>
p#error {
  color: red;
  font-family: Nunito;
}
#main {
  position: absolute;
  width: 80%;
  left: 200px;
  align-items: center;
  top: 100px;
}
h4 {
  position: absolute;
  left: 300px;
  font-family: Nunito;
  padding: 30px 0 0 0;
  font-size: 32px;
  top: 0px;
}

#selectClinic {
  position: absolute;
  left: 250px;
  align-items: left;
  width: 700px;
  text-align: left;
  top: 50px;
}
span {
  font-size: 18px;
}
#allconditions {
  width: 700px;
  left: 100px;
  position: absolute;
  top: 150px;
  text-align: left;
  font-family: Nunito;
}
#sideNavBar h3 {
  font-family: Nunito;
  font-size: 24px;
  letter-spacing: 4px;
  color: white;
  font-weight: bolder;
  padding: 10px 0px 0px 0px;
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
}
#conditionSet {
  display: inline-block;
  width: 300px;
  margin: 20px;
  left: 450px;
  font-family: Nunito;
}
input[type="checkbox"] {
  display: inline-block;
  height: 20px;
  width: 20px;
  /*margin-right: 10px;*/
  float: left;
  position: relative;
}
label {
  display: inline-block;
  position: relative;
  font-family: Nunito;
  width: 170px;
  text-align: left;
  font-size: 18px;
}
select {
  margin: 0px 20px 20px 0px;
  width: 200px;
  height: 30px;
  font-family: Nunito;
  font-size: 18px;
  position: absolute;
  left: 80px;
}

#home {
  width: 150px;
}

#buttons {
  width: 600px;
  left: 100px;
  position: absolute;
  top: 600px;
}
button {
  transition: 0.3s;
  position: relative;
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
  display: inline-block;
  width: 100px;
  text-align: center;
  margin: 20px;
}

button:hover {
  background-color: white;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.35);
  color: rgb(0, 114, 180);
  border: 1px solid rgb(0, 114, 180);
}
#selectedCon {
  font-family: Nunito;
  position: absolute;
  left: 130px;
  font-size: 18px;
  top: 550px;
  text-align: left;
}
#selectStatement {
  position: absolute;
  top: 60px;
  left: 80px;
}

h3#choose {
  position: absolute;
  left: -150px;
  top: -20px;
  font-family: Nunito;
}
</style>